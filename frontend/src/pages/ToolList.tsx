import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Space, Button, Typography, Badge, Divider } from 'antd'

const { Title, Text } = Typography

/** 後端回傳型別 */
interface ToolApi {
  ip: string
  toolId: string
  brand: string
  startTime: string
  endTime: string
  status: 'Connection' | 'Disconnection' | 'Alarm' | 'Isolation'
}

/** 前端邏輯狀態 */
type AppStatus = 'Isolation' | 'Alarm' | 'Building' | 'Up'
type StatusColor = 'yellow' | 'red' | 'orange' | 'green'

/** 顏色表（UI 用色） */
const statusColorMap: Record<StatusColor, string> = {
  yellow: '#ffe58f',
  red: '#ff7875',
  orange: '#ffc069',
  green: '#b7eb8f',
}

/** 後端→前端狀態 */
function apiStatusToAppStatus(s: ToolApi['status']): AppStatus {
  switch (s) {
    case 'Connection': return 'Up'
    case 'Disconnection': return 'Building'
    case 'Alarm': return 'Alarm'
    case 'Isolation': return 'Isolation'
  }
}

/** 前端狀態→顏色名稱（作為路由的 :color） */
function appStatusToColorName(s: AppStatus): StatusColor {
  switch (s) {
    case 'Up': return 'green'
    case 'Building': return 'orange'
    case 'Alarm': return 'red'
    case 'Isolation': return 'yellow'
  }
}

/** hover 變暗 */
function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, (num >> 16) - (255 * percent) / 100)
  const g = Math.max(0, ((num >> 8) & 0x00ff) - (255 * percent) / 100)
  const b = Math.max(0, (num & 0x0000ff) - (255 * percent) / 100)
  return `rgb(${r}, ${g}, ${b})`
}

export default function ToolList() {
  // 支援 /:kind/:brand 以及 /:kind/:brand/:status
  const { kind, brand, status } = useParams<{ kind: string; brand: string; status?: AppStatus }>()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toolsRaw, setToolsRaw] = useState<ToolApi[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!brand) return
      setLoading(true)
      setError(null)
      try {
        // 有 status 先打 /api/tools/{brand}/{status}，失敗退回 /api/tools/{brand}
        let data: ToolApi[] = []
        if (status) {
          try {
            const res = await axios.get<ToolApi[]>(`/api/tools/${brand}/${status}`)
            data = Array.isArray(res.data) ? res.data : []
          } catch {
            const res = await axios.get<ToolApi[]>(`/api/tools/${brand}`)
            data = Array.isArray(res.data) ? res.data : []
          }
        } else {
          const res = await axios.get<ToolApi[]>(`/api/tools/${brand}`)
          data = Array.isArray(res.data) ? res.data : []
        }
        setToolsRaw(data)
      } catch (err: any) {
        setError(err?.message ?? 'Failed to fetch tools')
        setToolsRaw([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [brand, status])

  // 映射 & （若有路由 status）再濾一次
  const tools = useMemo(() => {
    const mapped = toolsRaw.map(t => {
      const appStatus = apiStatusToAppStatus(t.status)
      const colorName = appStatusToColorName(appStatus)
      return {
        toolId: t.toolId,
        ip: t.ip,
        appStatus,
        colorName,                      // 'green' | 'orange' | 'red' | 'yellow'
        colorHex: statusColorMap[colorName],
      }
    })
    return status ? mapped.filter(t => t.appStatus === status) : mapped
  }, [toolsRaw, status])

  // 統計列
  const stat = useMemo(() => {
    const counts = { Isolation: 0, Alarm: 0, Building: 0, Up: 0 } as Record<AppStatus, number>
    for (const t of tools) counts[t.appStatus]++
    return counts
  }, [tools])

  // 排序（Up→Building→Alarm→Isolation）
  const order: AppStatus[] = ['Up', 'Building', 'Alarm', 'Isolation']
  const visualItems = useMemo(
    () => [...tools].sort((a, b) => order.indexOf(a.appStatus) - order.indexOf(b.appStatus)),
    [tools]
  )

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 8 }}>Kind: {kind}</Title>
      <Title level={4} style={{ marginTop: 0 }}>
        Brand: {brand} {status && <span>/ Status: {status}</span>}
      </Title>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
        <Badge color={statusColorMap.green} text={<Text strong>Up</Text>} /><Text>{stat.Up}</Text>
        <Badge color={statusColorMap.orange} text={<Text strong>Building</Text>} /><Text>{stat.Building}</Text>
        <Badge color={statusColorMap.red} text={<Text strong>Alarm</Text>} /><Text>{stat.Alarm}</Text>
        <Badge color={statusColorMap.yellow} text={<Text strong>Isolation</Text>} /><Text>{stat.Isolation}</Text>
      </div>

      <Divider style={{ margin: '12px 0 20px' }} />

      {loading && <Text>Loading...</Text>}
      {error && <Text type="danger">Error: {error}</Text>}

      {!loading && !error && (
        <Space wrap size="small" style={{ width: '100%' }}>
          {visualItems.map(item => (
            <Button
              key={item.toolId}
              size="large"
              style={{
                backgroundColor: item.colorHex,
                borderColor: item.colorHex,
                color: '#000',
                borderRadius: 10,
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                padding: '12px 14px',
                minWidth: 120,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = darkenColor(item.colorHex, 15)
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = item.colorHex
              }}
              onClick={() => {
                navigate(`/${kind}/${brand}/${item.appStatus}/${item.toolId}`)
              }}
            >
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontWeight: 700 }}>{item.toolId}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{item.ip}</div>
              </div>
            </Button>
          ))}
        </Space>
      )}
    </div>
  )
}
