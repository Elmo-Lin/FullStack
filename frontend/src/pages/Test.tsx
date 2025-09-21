import { Table } from "antd"
import Profile from "./Profile"

export default function Test() {
  // 假資料
  const data = [
    { key: 1, name: "Elmo", age: 25, address: "Taipei" },
    { key: 2, name: "Tom", age: 30, address: "Hsinchu" },
    { key: 3, name: "Jerry", age: 28, address: "Taichung" },
  ]

  // 欄位定義
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
  ]

  return (
    <div style={{ padding: 20 }}>
      <h1>AntD Table 範例</h1>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 2 }} // 每頁 2 筆
      />
      <Profile></Profile>
    </div>
  )
}
