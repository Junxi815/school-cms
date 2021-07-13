import { message, Button, Card, Table, Input, Space, Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { getStudents } from "../../../../api/";
import { Link } from "react-router-dom";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { getUser } from "../../../../utils/userInfo";

const columns = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (pre, next) => {
      const preCode = pre.name.charCodeAt(0);
      const nextCode = next.name.charCodeAt(0);
      return preCode > nextCode ? 1 : preCode === nextCode ? 0 : -1;
    },
  },
  {
    title: "Area",
    dataIndex: "area",
    key: "area",
    filters: [
      { text: "China", value: "china" },
      { text: "New Zealand", value: "new zealand" },
      { text: "Canada", value: "canada" },
      { text: "Australia", value: "australia" },
    ],
    onFilter: (value, record) => record.area.includes(value),
    width: 100,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Selected Curriculum",
    dataIndex: "courses",
    key: "courses",
    width: "20%",
    render: (courses) => {
      return courses?.map((course) => `"${course.name}"`).join(",");
    },
  },
  {
    title: "Student Type",
    dataIndex: "type",
    key: "type",
    filters: [
      { text: "Developer", value: "developer" },
      { text: "Tester", value: "tester" },
    ],
    render: (type) => type?.name,
    onFilter: (value, record) => record.type.name === value,
  },
  {
    title: "Join Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <span>Edit</span>
        <span>Delete</span>
      </Space>
    ),
  },
];

export default function Students() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageSize: 20, current: 1 });
  const [total, setTotal] = useState(0);
  const user = getUser();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const result = await getStudents({
          limit: pagination.pageSize,
          page: pagination.current,
        });
        const { students } = result.data;
        const data = students.map((item, index) => ({
          id: item.id,
          no: index + 1,
          name: item.name,
          area: item.country,
          email: item.email,
          courses: item.courses,
          type: item.type,
          time: item.createdAt,
        }));
        setData(data);
        setTotal(result.data.total);
        setLoading(false);
      } catch (error) {
        message.error(error.message);
      }
    };
    fetchStudents();
  }, [pagination]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

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
    <>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/dashboard/manager/">{`CMS ${user.role.toUpperCase()} SYSTEM`}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student</Breadcrumb.Item>
        <Breadcrumb.Item>Student List</Breadcrumb.Item>
      </Breadcrumb>
      <Card title={title} extra={extra}>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={{
            ...pagination,
            total,
            showSizeChanger: true,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      </Card>
    </>
  );
}
