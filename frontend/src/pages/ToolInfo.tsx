import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Row, Col, Typography, Button, Space, Table } from 'antd'

const { Title, Text } = Typography

interface ChamberResp {
  toolId: string
  chambers: string[]
}

type AppStatus = 'Isolation' | 'Alarm' | 'Building' | 'Up'

// 後端回傳的 SVID 最新值
interface TagValue {
  tag: string
  value: number
  timestamp: string
}

/** SVID 欄位定義 */
interface SvidItem {
  /** 放在 tag 的 key，如 GAS1、Pressure、water1... */
  key: string
  /** 表格顯示名稱 */
  label: string
  /** 單位（可空字串） */
  unit: string
}

/** 各品牌的 SVID schema（之後直接加 case 即可擴充） */
function getSvidSchema(brand?: string): SvidItem[] {
  const u = (brand || '').toUpperCase()
  switch (u) {
    case 'CS':
      return [
        { key: 'GAS1', label: 'GAS1', unit: 'sccm' },
        { key: 'GAS2', label: 'GAS2', unit: 'sccm' },
        { key: 'Pressure', label: 'Pressure', unit: 'Torr' },
      ]
    case 'IPI':
      return [
        { key: 'GAS1', label: 'GAS1', unit: 'sccm' },
        { key: 'GAS2', label: 'GAS2', unit: 'sccm' },
      ]
    case 'CT':
      return [
        { key: 'water1', label: 'Water 1', unit: 'L/min' },
        { key: 'water2', label: 'Water 2', unit: 'L/min' },
        { key: 'water3', label: 'Water 3', unit: 'L/min' },
      ]
    default:
      // 預設：常見的兩個欄位
      return [
        { key: 'GAS1', label: 'GAS1', unit: 'sccm' },
        { key: 'GAS2', label: 'GAS2', unit: 'sccm' },
      ]
  }
}

export default function ToolInfo() {
  const { kind, brand, status, toolId } = useParams<{
    kind: string
    brand: string
    status: AppStatus
    toolId: string
  }>()
  const navigate = useNavigate()

  // Chambers
  const [chambers, setChambers] = useState<string[]>([])
  const [chLoading, setChLoading] = useState(false)
  const [chError, setChError] = useState<string | null>(null)
  const [selectedCh, setSelectedCh] = useState<string | null>(null)

  // 隔離按鈕（前端切換）
  const [isIsolated, setIsIsolated] = useState(false)
  const [isolationLoading, setIsolationLoading] = useState(false)

  // 讀取 SVID 值
  const [valLoading, setValLoading] = useState(false)
  const [valError, setValError] = useState<string | null>(null)

  // 以「欄位 key -> 最新數值」的方式存值，更通用
  const [svidValues, setSvidValues] = useState<Record<string, number | null>>({})

  // 只撈 /api/tools/toolId/{toolId} 拿 chambers
  useEffect(() => {
    if (!toolId) return
    let alive = true
    ;(async () => {
      setChLoading(true)
      setChError(null)
      try {
        const { data } = await axios.get<ChamberResp>(`/api/tools/toolId/${toolId}`)
        const arr = Array.isArray(data?.chambers) ? data.chambers : []
        if (!alive) return
        setChambers(arr)
        setSelectedCh(arr[0] ?? null)
      } catch (e: any) {
        if (!alive) return
        setChError(e?.message ?? 'Failed to fetch chambers')
        setChambers([])
        setSelectedCh(null)
      } finally {
        if (!alive) setChLoading(false)
        else setChLoading(false)
      }
    })()
    return () => { alive = false }
  }, [toolId])

  // 切 Chamber 或 brand，就去打 /api/values?tag=...
  useEffect(() => {
    if (!toolId || !selectedCh) return
    const schema = getSvidSchema(brand)
    if (schema.length === 0) return

    const ctrl = new AbortController()
    ;(async () => {
      setValLoading(true)
      setValError(null)
      try {
        const base = `${toolId}/${selectedCh}`

        // 個別查詢（沿用你現行後端 /values?tag=...）
        const reqs = schema.map(({ key }) =>
          axios.get<TagValue>('/api/values', {
            params: { tag: `${base}/${key}` },
            signal: ctrl.signal,
          })
        )
        const res = await Promise.allSettled(reqs)

        // 先用 null 填滿所有欄位（確保表格固定欄位/順序）
        const next: Record<string, number | null> = Object.fromEntries(
          schema.map(({ key }) => [key, null] as const)
        )

        // 回填成功的
        res.forEach((r, i) => {
          const key = schema[i].key
          if (r.status === 'fulfilled') {
            next[key] = r.value.data?.value ?? null
          }
        })

        setSvidValues(next)

        if (res.every(r => r.status === 'rejected')) {
          setValError('無法取得最新值')
        }
      } catch (e: any) {
        if (!ctrl.signal.aborted) {
          setValError(e?.message ?? '讀取失敗')
        }
      } finally {
        if (!ctrl.signal.aborted) setValLoading(false)
      }
    })()

    return () => ctrl.abort()
  }, [brand, toolId, selectedCh])

  const handleToggleIsolation = async () => {
    try {
      setIsolationLoading(true)
      // TODO: 串後端時在這裡呼叫
      // await axios.post(`/api/tools/${toolId}/isolation`, { isolate: !isIsolated })
      setIsIsolated(p => !p)
    } finally {
      setIsolationLoading(false)
    }
  }

  const handleGoToDetail = () => {
    if (!selectedCh) return
    navigate(`${selectedCh}/Detail`)
  }

  const columns = [
    { dataIndex: 'name',  key: 'name',  width: '5%', render: (v: string) => <Text strong>{v}</Text> },
    { dataIndex: 'value', key: 'value', width: '5%', align: 'right' as const },
    { dataIndex: 'unit',  key: 'unit',  width: '5%', align: 'right' as const },
  ]

  const data = useMemo(() => {
    const schema = getSvidSchema(brand)
    const rows = schema.map(({ key, label, unit }) => {
      const v = svidValues[key]
      return {
        key,
        name: label,
        value: v == null ? '-' : v.toLocaleString(),
        unit,
      }
    })

    if (!valLoading && rows.length === 0) {
      return [{ key: 'empty', name: '-', value: '-', unit: '-' }]
    }
    return rows
  }, [brand, svidValues, valLoading])

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[8, 24]} align="top">
        <Col xs={24} md={16} lg={14} xl={12}>
          {/* 標題 + 隔離按鈕 */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Title level={4} style={{ margin: 0, lineHeight: 1 }}>{toolId}</Title>
              <Button
                size="small"
                type={isIsolated ? 'primary' : 'default'}
                danger={isIsolated}
                loading={isolationLoading}
                onClick={handleToggleIsolation}
                style={{ borderRadius: 8, padding: '0 12px' }}
              >
                {isIsolated ? '解隔離' : '隔離'}
              </Button>
            </div>
            <div><Text type="secondary">{kind} · {brand} · {status}</Text></div>
          </div>

          {/* Chambers */}
          <div style={{ marginBottom: 8 }}>
            <Text strong>Chambers：</Text>
            {chLoading && <Text style={{ marginLeft: 8 }}>Loading...</Text>}
            {chError && <Text type="danger" style={{ marginLeft: 8 }}>Error: {chError}</Text>}
          </div>

          {!chLoading && !chError && (
            chambers.length > 0 ? (
              <Space wrap size="small" style={{ marginBottom: 16 }}>
                {chambers.map(ch => (
                  <Button
                    key={ch}
                    size="small"
                    type={selectedCh === ch ? 'primary' : 'default'}
                    style={{ borderRadius: 8 }}
                    onClick={() => setSelectedCh(ch)}
                  >
                    {ch}
                  </Button>
                ))}
              </Space>
            ) : (
              <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                無 Chamber
              </Text>
            )
          )}

          {/* 三欄直列表格 */}
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            size="middle"
            bordered
            showHeader={false}
            loading={valLoading}
            style={{ maxWidth: 560 }}
          />
          {valError && <Text type="danger" style={{ display: 'block', marginTop: 8 }}>{valError}</Text>}

          <div style={{ marginTop: 16 }}>
            <Button type="primary" onClick={handleGoToDetail}>Alarm資訊</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
