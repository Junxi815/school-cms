import { message, Button, Card, Table, Input, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { getStudents } from "../../../../api/";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

export default function Students() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        return await getStudents();
      } catch (error) {
        message.error(error);
      }
    };
    setLoading(true);
    const students = fetchStudents();
    console.log(students);
    setLoading(false);
  }, []);

  const title = (
    <Button type="primary">
      <PlusOutlined />
      Add
    </Button>
  );

  const extra = (
    <Space>
      <Input placeholder="Search by name"></Input>
      <Button type="primary">
        <SearchOutlined />
      </Button>
    </Space>
  );

  return (
    <Spin spinning={isLoading} tip="Fetching data......">
      <Card title={title} extra={extra}>
        <Table></Table>
      </Card>
    </Spin>
  );
}
