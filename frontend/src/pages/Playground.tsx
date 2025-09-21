import { useMemo, useState } from "react"
import {
  Card,
  Row,
  Col,
  Space,
  Typography,
  Button,
  Tabs,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd"
import type { ColumnsType } from "antd/es/table"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"

const { Text } = Typography

type TabKey = "SVID" | "ALID"

interface SvidRow {
  key: string
  id: number
  name: string
  unit: string
  min?: number
  max?: number
  desc?: string
}

interface AlidRow {
  key: string
  code: number
  name: string
  severity: "Info" | "Warning" | "Alarm"
  desc?: string
}

export default function Playground() {
  /** Header —— dropdown states */
  const [modelName, setModelName] = useState("ITI")
  const [lscType, setLscType] = useState("電熱式")
  const [chamberType, setChamberType] = useState("Single Side")

  /** Tabs */
  const [active, setActive] = useState<TabKey>("SVID")

  /** SVID data & selection */
  const [svidData, setSvidData] = useState<SvidRow[]>([
    { key: "s1", id: 1001, name: "GAS1", unit: "sccm", min: 0, max: 500 },
    { key: "s2", id: 1002, name: "Pressure", unit: "Pa", min: 0, max: 200 },
  ])
  const [svidSelected, setSvidSelected] = useState<React.Key[]>([])

  /** ALID data & selection */
  const [alidData, setAlidData] = useState<AlidRow[]>([
    { key: "a1", code: 2001, name: "Door Open", severity: "Warning" },
    { key: "a2", code: 2002, name: "Over Pressure", severity: "Alarm" },
  ])
  const [alidSelected, setAlidSelected] = useState<React.Key[]>([])

  /** Add modal (shared) */
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  /** Columns */
  const svidColumns: ColumnsType<SvidRow> = [
    { title: "ID", dataIndex: "id", width: 100, sorter: (a, b) => a.id - b.id },
    { title: "Name", dataIndex: "name" },
    { title: "Unit", dataIndex: "unit", width: 120 },
    { title: "Min", dataIndex: "min", width: 100 },
    { title: "Max", dataIndex: "max", width: 100 },
    { title: "Description", dataIndex: "desc" },
  ]

  const alidColumns: ColumnsType<AlidRow> = [
    { title: "Code", dataIndex: "code", width: 100, sorter: (a, b) => a.code - b.code },
    { title: "Name", dataIndex: "name" },
    {
      title: "Severity",
      dataIndex: "severity",
      width: 140,
      filters: [
        { text: "Info", value: "Info" },
        { text: "Warning", value: "Warning" },
        { text: "Alarm", value: "Alarm" },
      ],
      onFilter: (v, r) => r.severity === v,
    },
    { title: "Description", dataIndex: "desc" },
  ]

  /** Actions */
  const onQuery = () => {
    console.log("Query:", { modelName, lscType, chamberType })
  }
  const onCreate = () => {
    console.log("Create:", { modelName, lscType, chamberType })
  }

  const openAdd = () => {
    form.resetFields()
    setOpen(true)
  }
  const onAddOk = async () => {
    const values = await form.validateFields()
    if (active === "SVID") {
      const newRow: SvidRow = {
        key: crypto.randomUUID(),
        id: values.id,
        name: values.name,
        unit: values.unit ?? "",
        min: values.min,
        max: values.max,
        desc: values.desc,
      }
      setSvidData(d => [...d, newRow])
    } else {
      const newRow: AlidRow = {
        key: crypto.randomUUID(),
        code: values.code,
        name: values.name,
        severity: values.severity,
        desc: values.desc,
      }
      setAlidData(d => [...d, newRow])
    }
    setOpen(false)
  }

  const onDelete = () => {
    if (active === "SVID") {
      setSvidData(d => d.filter(r => !svidSelected.includes(r.key)))
      setSvidSelected([])
    } else {
      setAlidData(d => d.filter(r => !alidSelected.includes(r.key)))
      setAlidSelected([])
    }
  }

  /** Current table */
  const table = useMemo(() => {
    if (active === "SVID") {
      return (
        <Table
          size="middle"
          rowSelection={{ selectedRowKeys: svidSelected, onChange: setSvidSelected }}
          columns={svidColumns}
          dataSource={svidData}
          pagination={{ pageSize: 8 }}
        />
      )
    }
    return (
      <Table
        size="middle"
        rowSelection={{ selectedRowKeys: alidSelected, onChange: setAlidSelected }}
        columns={alidColumns}
        dataSource={alidData}
        pagination={{ pageSize: 8 }}
      />
    )
  }, [active, svidSelected, alidSelected, svidColumns, alidColumns, svidData, alidData])

  return (
    <div style={{ padding: 24 }}>
      <Card style={{ borderRadius: 12 }}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          {/* 第一排：Model Name + 按鈕 */}
          <Row align="middle" gutter={16}>
            <Col flex="150px">
              <Text strong>Model Name:</Text>
            </Col>
            <Col flex="200px">
              <Select
                value={modelName}
                onChange={setModelName}
                options={[
                  { value: "ITI", label: "ITI" },
                  { value: "CS", label: "CS" },
                ]}
                style={{ width: "100%" }}
              />
            </Col>
            <Col>
              <Space>
                <Button onClick={onQuery}>Query</Button>
                <Button onClick={onCreate}>Create Model</Button>
              </Space>
            </Col>
          </Row>

          {/* 第二排：LSC type + Chamber type */}
          <Row align="middle" gutter={16}>
            <Col flex="120px">
              <Text strong>LSC Type:</Text>
            </Col>
            <Col flex="200px">
              <Select
                value={lscType}
                onChange={setLscType}
                options={[
                  { value: "電熱式", label: "電熱式" },
                  { value: "燃燒式", label: "燃燒式" },
                ]}
                style={{ width: "100%" }}
              />
            </Col>

            <Col flex="140px">
              <Text strong>Chamber Type:</Text>
            </Col>
            <Col flex="200px">
              <Select
                value={chamberType}
                onChange={setChamberType}
                options={[
                  { value: "Single Side", label: "Single Side" },
                  { value: "Twin Side", label: "Twin Side" },
                ]}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>

          {/* Tabs */}
          <Tabs
            activeKey={active}
            onChange={k => setActive(k as TabKey)}
            items={[
              { key: "SVID", label: "SVID" },
              { key: "ALID", label: "ALID" },
            ]}
          />

          {/* Toolbar */}
          <Row justify="start">
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={openAdd} style={{ borderRadius: 20 }}>
                Add
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={onDelete}
                disabled={active === "SVID" ? svidSelected.length === 0 : alidSelected.length === 0}
                style={{ borderRadius: 20 }}
              >
                Delete
              </Button>
            </Space>
          </Row>

          {/* Table */}
          <div style={{ border: "1px solid #d9d9d9", borderRadius: 8, padding: 16 }}>
            {table}
          </div>
        </Space>
      </Card>

      {/* Add modal */}
      <Modal
        title={active === "SVID" ? "Add SVID" : "Add ALID"}
        open={open}
        onOk={onAddOk}
        onCancel={() => setOpen(false)}
        okText="Save"
      >
        {active === "SVID" ? (
          <Form form={form} layout="vertical">
            <Form.Item label="ID" name="id" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Unit" name="unit">
              <Input placeholder="e.g. sccm / Pa / °C" />
            </Form.Item>
            <Form.Item label="Min" name="min">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Max" name="max">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Description" name="desc">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item label="Code" name="code" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Severity" name="severity" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: "Info", value: "Info" },
                  { label: "Warning", value: "Warning" },
                  { label: "Alarm", value: "Alarm" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Description" name="desc">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  )
}
