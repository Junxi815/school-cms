import {
  message,
  Button,
  Card,
  Table,
  Input,
  Space,
  Breadcrumb,
  Popconfirm,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { getStudents } from "../../../../api/";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { getUser } from "../../../../utils/userInfo";

const { Search } = Input;
const TextLink = Typography.Link;

const columns = [
  {
    title: "No.",
    // dataIndex: "no",
    key: "no",
    render: (text, record, index) => index + 1,
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
    render: (text, record) => (
      <Link to={`/dashboard/manager/students/${record.id}`}>{record.name}</Link>
    ),
  },
  {
    title: "Area",
    dataIndex: "country",
    key: "area",
    filters: [
      { text: "China", value: "China" },
      { text: "New Zealand", value: "New zealand" },
      { text: "Canada", value: "Canada" },
      { text: "Australia", value: "Australia" },
    ],
    onFilter: (value, record) => record.country.includes(value),
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
    width: "25%",
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
    dataIndex: "createdAt",
    key: "time",
    width: "15%",
    render: (value) =>
      formatDistanceToNow(new Date(value), { addSuffix: true }),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <span>
          <TextLink onClick={editStudent}>Edit</TextLink>
        </span>
        <Popconfirm title="Sure to delete?" onConfirm={cancel}>
          <TextLink>Delete</TextLink>
        </Popconfirm>
      </Space>
    ),
  },
];
const editStudent = () => {};
const cancel = () => {};

export default function Students() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageSize: 20, current: 1 });
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const user = getUser();

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const reqParams = !!query
        ? {
            limit: pagination.pageSize,
            page: pagination.current,
            query: query,
          }
        : { limit: pagination.pageSize, page: pagination.current };
      const result = await getStudents(reqParams);
      if (result.code >= 200 && result.code < 300) {
        const { students } = result.data;
        setData(students);
        setTotal(result.data.total);
        setLoading(false);
      } else {
        message.error(result.msg);
      }
    };
    fetchStudents();
  }, [pagination, query]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const debouncedQuery = (e) => {
    debounce(function () {
      setQuery(e.target.value);
    }, 1000)();
  };

  const title = (
    <Button type="primary">
      <PlusOutlined />
      Add
    </Button>
  );

  const extra = (
    <Search
      placeholder="search by name"
      onSearch={(value) => setQuery(value)}
      onChange={debouncedQuery}
    />
  );

  return (
    <>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/dashboard/manager">{`CMS ${user.role.toUpperCase()} SYSTEM`}</Link>
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
