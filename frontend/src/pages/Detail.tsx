import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Descriptions,
  Row,
  Col,
  Card,
  Typography,
  Tag,
  Empty,
  Skeleton,
} from 'antd'

const { Text } = Typography

/** 後端 /api/alarms?tag=... 回傳 */
interface AlarmTagValue {
  tag: string
  value: boolean
  timestamp: string
}

/** 各品牌的 Alarm schema（之後直接加 case 即可擴充） */
function getAlarmSchema(brand?: string): Array<{ key: string; label: string }> {
  const u = (brand || '').toUpperCase()
  switch (u) {
    case 'CS':
      return [
        { key: 'alarm1', label: 'Alarm 1' },
        { key: 'alarm2', label: 'Alarm 2' },
        { key: 'alarm3', label: 'Alarm 3' },
      ]
    case 'IPI':
      return [
        { key: 'alarm4', label: 'Alarm 4' },
        { key: 'alarm5', label: 'Alarm 5' },
        { key: 'alarm6', label: 'Alarm 6' },
      ]
    case 'CT':
      return [
        { key: 'alarm7', label: 'Alarm 7' },
        { key: 'alarm8', label: 'Alarm 8' },
        { key: 'alarm9', label: 'Alarm 9' },
      ]
    default:
      // 預設給兩個欄位，避免完全空表
      return [
        { key: 'alarm1', label: 'Alarm 1' },
        { key: 'alarm2', label: 'Alarm 2' },
      ]
  }
}

/** 依 boolean/null 回傳狀態標籤（與你原本一樣紅=Alarm、綠=Normal） */
function renderStatusTag(v: boolean | null) {
  if (v == null) return <Tag style={{ fontSize: 12, padding: '0 6px' }}>—</Tag>
  return v
    ? <Tag color="red" style={{ fontSize: 12, padding: '0 6px' }}>Alarm</Tag>
    : <Tag color="green" style={{ fontSize: 12, padding: '0 6px' }}>Normal</Tag>
}

export default function Detail() {
  // 路由：/:kind/:brand/:color/:toolId/:chamber/Detail
  const { kind, brand, color, toolId, chamber } = useParams<{
    kind: string
    brand: string
    color: string
    toolId: string
    chamber?: string
  }>()
  const navigate = useNavigate()

  // 讀取狀態
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 以「alarmKey -> { val, ts }」存值，方便擴充/渲染
  const [alarmValues, setAlarmValues] = useState<Record<string, { val: boolean | null; ts: string | null }>>({})

  // 取得指定 chamber 的所有 alarm 最新值（以 schema 為準）
  useEffect(() => {
    if (!toolId || !chamber) return
    const schema = getAlarmSchema(brand)
    if (schema.length === 0) return

    const ctrl = new AbortController()
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const base = `${toolId}/${chamber}`

        // 個別查詢（沿用 /api/alarms?tag=...）
        const reqs = schema.map(({ key }) =>
          axios.get<AlarmTagValue>('/api/alarms', {
            params: { tag: `${base}/${key}` },
            signal: ctrl.signal,
          })
        )
        const res = await Promise.allSettled(reqs)

        const next: Record<string, { val: boolean | null; ts: string | null }> = Object.fromEntries(
          schema.map(({ key }) => [key, { val: null, ts: null }] as const)
        )

        res.forEach((r, i) => {
          const key = schema[i].key
          if (r.status === 'fulfilled') {
            next[key] = {
              val: r.value.data?.value ?? null,
              ts:  r.value.data?.timestamp ?? null,
            }
          }
        })

        setAlarmValues(next)

        if (res.every(r => r.status === 'rejected')) {
          setError('無法取得最新 Alarm 資料')
        }
      } catch (e: any) {
        if (!ctrl.signal.aborted) setError(e?.message ?? '讀取失敗')
      } finally {
        if (!ctrl.signal.aborted) setLoading(false)
      }
    })()

    return () => ctrl.abort()
  }, [brand, toolId, chamber])

  // 右側卡片網格要渲染的資料
  const cards = useMemo(() => {
    const schema = getAlarmSchema(brand)
    return schema.map(({ key, label }) => {
      const found = alarmValues[key]
      const ts = found?.ts ? new Date(found.ts).toLocaleString() : null
      return { key, label, status: found?.val ?? null, ts }
    })
  }, [brand, alarmValues])

  return (
    <div style={{ padding: 40 }}>
      <Row gutter={32} align="top">
        {/* 左側：Tool 詳細資訊（保持你原本的樣式） */}
        <Col flex="0 0 320px">
          <Card title="Tool 詳細資訊" variant="outlined" styles={{ body: { padding: 12 } }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Kind">{kind}</Descriptions.Item>
              <Descriptions.Item label="Brand">{brand}</Descriptions.Item>
              <Descriptions.Item label="Color">{color}</Descriptions.Item>
              <Descriptions.Item label="Tool ID">{toolId}</Descriptions.Item>
              <Descriptions.Item label="Chamber">{chamber ?? '-'}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* 右側：Alarm 狀態總覽（恢復原本卡片格狀排版） */}
        <Col flex="1">
          <Card
            title={chamber ? `Alarm 狀態總覽 — ${chamber}` : 'Alarm 狀態總覽（請從上一頁選擇 Chamber）'}
            variant="outlined"
          >
            {!chamber ? (
              <Empty description="路由未提供 Chamber，無法查詢 Alarm。" />
            ) : loading ? (
              <Row gutter={[12, 12]}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Col key={i} xs={12} sm={8} md={6} lg={4} xl={4}>
                    <Card style={{ borderRadius: 8 }}>
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : cards.length === 0 ? (
              <Empty description="此 Chamber 目前沒有定義的 Alarm 欄位" />
            ) : (
              <Row gutter={[12, 12]}>
                {cards.map((item) => (
                  <Col key={item.key} xs={12} sm={8} md={6} lg={4} xl={4}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: 8,
                        textAlign: 'center',
                        background: '#fff',
                        padding: '6px 0',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                      }}
                      styles={{ body: { padding: 8 } }}
                    >
                      {/* 上：Alarm 名稱（對應 schema.label） */}
                      <Typography.Text style={{ fontSize: 13 }}>
                        {item.label}
                      </Typography.Text>

                      {/* 中：Alarm / Normal 標籤（保持原本紅/綠） */}
                      <div style={{ marginTop: 6 }}>
                        {renderStatusTag(item.status)}
                      </div>

                      {/* 下：Chamber 與時間（時間可選顯示） */}
                      <div style={{ marginTop: 6 }}>
                        <Tag style={{ fontSize: 11, padding: '0 6px' }}>
                          {chamber}
                        </Tag>
                      </div>
                      {item.ts && (
                        <div style={{ marginTop: 2 }}>
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            {item.ts}
                          </Text>
                        </div>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {error && <Text type="danger" style={{ display: 'block', marginTop: 8 }}>{error}</Text>}
          </Card>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: 24 }}>
        <Button size="small" onClick={() => navigate(-1)}>返回上一頁</Button>
      </Row>
    </div>
  )
}
