import { Table, Input, Space } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { SearchOutlined } from '@ant-design/icons'
import { useState, useRef } from 'react'
import type { InputRef } from 'antd'

interface IsolationInfo {
  key: number
  toolId: string
  startTime: string
  endTime: string
}

const mockData: IsolationInfo[] = Array.from({ length: 50 }).map((_, index) => ({
  key: index,
  toolId: `Tool-${1000 + index}`,
  startTime: `2025-07-31 0${index % 10}:00:00`,
  endTime: `2025-07-31 1${index % 10}:00:00`,
}))

export default function Isolation() {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20'],
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

  const getColumnSearchProps = (dataIndex: keyof IsolationInfo): ColumnsType<IsolationInfo>[number] => ({
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

  const [keyword, setKeyword] = useState('')

  const filteredData = mockData.filter((item) =>
    item.toolId.toLowerCase().includes(keyword.toLowerCase())
  )

  const columns: ColumnsType<IsolationInfo> = [
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
  ]

  return (
    <>
      <h1 style={{ marginBottom: 16 }}>Isolation Info</h1>

      <Input.Search
        placeholder="Search Tool ID..."
        allowClear
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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
