import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

/** 從後端取回的資料型別 */
interface ToolApi {
  ip: string
  toolId: string
  brand: string
  startTime: string
  endTime: string
  status: 'Connection' | 'Disconnection' | 'Alarm' | 'Isolation'
}

/** 前端使用的四種狀態 */
export type AppStatus = 'Isolation' | 'Alarm' | 'Building' | 'Up'

interface ToolStatus {
  status: AppStatus
  count: number
  color: string
}

interface BrandItem {
  name: string
  total: number
  machines: ToolStatus[]
}

interface KindItem {
  kind: string
  brands: BrandItem[]
}

/** 狀態→顏色（你原本的對照） */
const statusColorMap: Record<AppStatus, string> = {
  Isolation: 'yellow',
  Alarm: 'red',
  Building: 'orange',
  Up: 'green',
}

/** 後端狀態 → 前端狀態 */
const apiStatusToAppStatus = (s: ToolApi['status']): AppStatus => {
  switch (s) {
    case 'Connection':
      return 'Up'
    case 'Disconnection':
      return 'Building'
    case 'Alarm':
      return 'Alarm'
    case 'Isolation':
      return 'Isolation'
  }
}

/** brand → kind 對照表 */
const brandToKind: Record<string, string> = {
  CS: 'Kind-1',
  CT: 'Kind-1',
  IPI: 'Kind-2',
}

/** 不在表內的 brand 會放這個 kind（可自行調整） */
const defaultKind = 'Kind-Other'

/** 將 API 清單轉為畫面需要的 KindItem[] 結構 */
function buildKindData(tools: ToolApi[]): KindItem[] {
  // kind -> brand -> statusCount
  const map = new Map<
    string,
    Map<
      string,
      {
        counts: Record<AppStatus, number>
      }
    >
  >()

  for (const t of tools) {
    const kind = brandToKind[t.brand] ?? defaultKind
    const brand = t.brand
    const appStatus = apiStatusToAppStatus(t.status)

    if (!map.has(kind)) map.set(kind, new Map())
    const brandMap = map.get(kind)!

    if (!brandMap.has(brand)) {
      brandMap.set(brand, {
        counts: { Isolation: 0, Alarm: 0, Building: 0, Up: 0 },
      })
    }
    brandMap.get(brand)!.counts[appStatus]++
  }

  // Map -> KindItem[]
  const result: KindItem[] = []
  for (const [kind, brandMap] of map.entries()) {
    const brands: BrandItem[] = []
    for (const [brand, { counts }] of brandMap.entries()) {
      const machines: ToolStatus[] = (['Isolation', 'Alarm', 'Building', 'Up'] as AppStatus[]).map(
        (s) => ({
          status: s,
          count: counts[s],
          color: statusColorMap[s],
        })
      )
      const total = machines.reduce((acc, m) => acc + m.count, 0)
      brands.push({ name: brand, total, machines })
    }
    brands.sort((a, b) => a.name.localeCompare(b.name)) // 選用：品牌排序
    result.push({ kind, brands })
  }

  result.sort((a, b) => a.kind.localeCompare(b.kind)) // 選用：kind 排序
  return result
}

export default function Home() {
  const [tools, setTools] = useState<ToolApi[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data } = await axios.get<ToolApi[]>('/api/tools')
        setTools(data ?? [])
      } catch (err: any) {
        setError(err?.message ?? 'Failed to fetch /api/tools')
      } finally {
        setLoading(false)
      }
    }
    fetchTools()
  }, [])

  // 依 brand→kind 對照表 + 狀態映射，彙總成四個按鈕的數量
  const data: KindItem[] = useMemo(() => buildKindData(tools), [tools])

  /** ✅ 改成用 status 當路由參數（不再用 color） */
  const handleStatusClick = (kind: string, brand: string, machine: ToolStatus) => {
    navigate(`/${kind}/${brand}/${machine.status}`)
  }

  const handleBrandClick = (kind: string, brand: string) => {
    navigate(`/${kind}/${brand}`)
  }

  return (
    <div
      style={{
        padding: '0px 20px 20px',
        background: '#f3f3f3',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: 40 }}>Local Scrubber</h1>

      {loading && <p>Loading...</p>}
      {error && (
        <p style={{ color: 'crimson', fontWeight: 'bold' }}>
          Error: {error}
        </p>
      )}

      {!loading && !error && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 48,
            justifyItems: 'center',
          }}
        >
          {data.map((kindBlock) => (
            <div key={kindBlock.kind} style={{ width: 220 }}>
              <div
                style={{
                  backgroundColor: '#d97706',
                  color: 'white',
                  padding: '12px 16px',
                  marginBottom: 16,
                  borderRadius: 8,
                  fontWeight: 'bold',
                  fontSize: 18,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
              >
                {kindBlock.kind}
              </div>

              {kindBlock.brands.map((brand) => (
                <div
                  key={brand.name}
                  style={{
                    backgroundColor: '#60a5fa',
                    padding: 12,
                    marginBottom: 20,
                    borderRadius: 8,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* 👉 點品牌看全部（不過濾狀態） */}
                  <div
                    onClick={() => handleBrandClick(kindBlock.kind, brand.name)}
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      marginBottom: 8,
                      fontSize: 16,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    {brand.name}（{brand.total}）
                  </div>

                  {/* 👉 四個狀態按鈕：數字 = 該狀態數量。路由改為 /:kind/:brand/:status */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    {brand.machines.map((machine) => (
                      <button
                        key={machine.status}
                        onClick={() =>
                          handleStatusClick(kindBlock.kind, brand.name, machine)
                        }
                        style={{
                          flex: 1,
                          backgroundColor: machine.color,
                          padding: '12px 0',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 16,
                          border: '1px solid #999',
                          borderRadius: 4,
                          cursor: 'pointer',
                        }}
                        title={machine.status}
                      >
                        {machine.count}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
