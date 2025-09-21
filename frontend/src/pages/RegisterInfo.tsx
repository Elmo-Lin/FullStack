import { Table, Tag, Input, Space } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { SearchOutlined } from '@ant-design/icons'
import { useState, useRef } from 'react'
import type { InputRef } from 'antd'

interface ToolInfo {
  key: number
  ip: string
  toolId: string
  startTime: string
  endTime: string
  status: string
}

const rawData: ToolInfo[] = Array.from({ length: 100 }).map((_, index) => ({
  key: index,
  ip: `192.168.0.${index + 1}`,
  toolId: `Tool-${1000 + index}`,
  startTime: `2025-07-30 08:${index.toString().padStart(2, '0')}`,
  endTime: `2025-07-30 09:${index.toString().padStart(2, '0')}`,
  status: index % 3 === 0 ? 'Running' : index % 3 === 1 ? 'Isolation' : 'Disconnection',
}))

export default function RegisterInfo() {

  const [globalSearch, setGlobalSearch] = useState('')
  const searchInput = useRef<InputRef>(null)

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20'],
  })

  const getColumnSearchProps = (dataIndex: keyof ToolInfo): ColumnsType<ToolInfo>[number] => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] as string}
          onChange={(e) =>
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
  }

  const handleReset = (clearFilters?: () => void) => {
    clearFilters?.()
  }

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination)
  }

  const filteredData = rawData.filter((item) =>
    item.toolId.toLowerCase().includes(globalSearch.toLowerCase())
  )

  const columns: ColumnsType<ToolInfo> = [
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      ...getColumnSearchProps('ip'),
    },
    {
      title: 'Tool ID',
      dataIndex: 'toolId',
      key: 'toolId',
      ...getColumnSearchProps('toolId'),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      sorter: (a, b) =>
        new Date(a.endTime).getTime() - new Date(b.endTime).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Running', value: 'Running' },
        { text: 'Isolation', value: 'Isolation' },
        { text: 'Disconnection', value: 'Disconnection' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const color = status === 'Running' ? 'green' : status === 'Isolation' ? 'blue' : 'red'
        return <Tag color={color}>{status}</Tag>
      },
    },
  ]

  return (
    <>
      <h1 style={{ marginBottom: 16 }}>Register Info</h1>

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
