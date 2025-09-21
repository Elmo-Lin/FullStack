import { Table, Tag, Input, Space } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { SearchOutlined } from '@ant-design/icons'
import { useState, useRef } from 'react'
import type { InputRef } from 'antd'

interface AlarmInfo {
  key: number
  toolId: string
  alarmTime: string
  description: 'OOC' | 'OOS'
}

const rawData: AlarmInfo[] = Array.from({ length: 50 }).map((_, index) => ({
  key: index,
  toolId: `Tool-${1000 + index}`,
  alarmTime: `2025-07-31 1${index % 10}:00:00`,
  description: index % 2 === 0 ? 'OOC' : 'OOS',
}))

export default function Alarm() {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [globalSearch, setGlobalSearch] = useState('')
  const searchInput = useRef<InputRef>(null)

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20'],
  })

  const getColumnSearchProps = (dataIndex: keyof AlarmInfo): ColumnsType<AlarmInfo>[number] => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] as string}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value as string] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <a onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}>Search</a>
          <a onClick={() => handleReset(clearFilters)}>Reset</a>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  })

  const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters?: () => void) => {
    clearFilters?.()
    setSearchText('')
  }

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination)
  }

  const filteredData = rawData.filter(item =>
    item.toolId.toLowerCase().includes(globalSearch.toLowerCase())
  )

  const columns: ColumnsType<AlarmInfo> = [
    {
      title: 'Tool ID',
      dataIndex: 'toolId',
      key: 'toolId',
      ...getColumnSearchProps('toolId'),
    },
    {
      title: 'Alarm Time',
      dataIndex: 'alarmTime',
      key: 'alarmTime',
      sorter: (a, b) =>
        new Date(a.alarmTime).getTime() - new Date(b.alarmTime).getTime(),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      filters: [
        { text: 'OOC', value: 'OOC' },
        { text: 'OOS', value: 'OOS' },
      ],
      onFilter: (value, record) => record.description === value,
      render: (desc) => (
        <Tag color={desc === 'OOC' ? 'orange' : 'red'}>
          {desc}
        </Tag>
      ),
    },
  ]

  return (
    <>
      <h1 style={{ marginBottom: 16 }}>Alarm History</h1>

      <Input.Search
        placeholder="Search Tool ID..."
        allowClear
        value={globalSearch}
        onChange={(e) => setGlobalSearch(e.target.value)}
        style={{ width: 300, marginBottom: 24 }}
      />

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="key"
      />
    </>
  )
}
