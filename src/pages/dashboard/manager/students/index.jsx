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
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../../../../lib/services/api";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { getUser } from "../../../../lib/services/userInfo";
import { useDebouncedSearch } from "../../../../components/custom-hooks/debounce-search";
import ModelForm from "../../../../components/modal/modal-form";
import AddEditForm from "../../../../components/students/add-edit-form";
import { studentTypes } from "../../../../lib/constants/student-types";

const { Search } = Input;
const TextLink = Typography.Link;

export default function Students() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageSize: 20, current: 1 });
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const user = getUser();

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const debouncedQuery = useDebouncedSearch(setQuery);

  const columns = [
    {
      title: "No.",
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
        <Link to={`/dashboard/manager/students/${record.id}`}>
          {record.name}
        </Link>
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
            <TextLink
              onClick={() => {
                editAction(record);
              }}
            >
              Edit
            </TextLink>
          </span>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteRecord(record)}
          >
            <TextLink>Delete</TextLink>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const editAction = (student) => {
    setEditingStudent(student);
    setModalVisible(true);
  };
  const addAction = () => {
    setEditingStudent(null);
    setModalVisible(true);
  };
  const deleteRecord = async (student) => {
    const result = await deleteStudent(student.id);
    if (result.code >= 200 && result.code < 300) {
      const index = data.findIndex((item) => item.id === student.id);
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
      setTotal(total - 1);
      message.success("Deleted it successfully.");
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const handleFormSubmit = async (formValues) => {
    const result = !!editingStudent
      ? await updateStudent({ id: editingStudent.id, ...formValues })
      : await addStudent(formValues);
    if (result.code >= 200 && result.code < 300) {
      setModalVisible(false);
      message.success(result.msg);
      if (!!editingStudent) {
        const index = data.findIndex((item) => item.id === editingStudent.id);
        data[index].type.id = formValues.type;
        data[index].type.name = Object.keys(studentTypes).find(
          (key) => studentTypes[key] === formValues.type
        );
        data[index].name = formValues.name;
        data[index].country = formValues.country;
        data[index].email = formValues.email;
        setData([...data]);
      }
    }
  };

  const title = (
    <Button type="primary" onClick={addAction}>
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

  useEffect(() => {
    const fetchStudents = async () => {
      const reqParams = !!query
        ? {
            limit: pagination.pageSize,
            page: pagination.current,
            query: query,
          }
        : { limit: pagination.pageSize, page: pagination.current };

      setLoading(true);
      const result = await getStudents(reqParams);
      setLoading(false);

      if (result.code >= 200 && result.code < 300) {
        const { students, total } = result.data;
        setData(students);
        setTotal(total);
      } else {
        message.error(result.msg);
      }
    };
    fetchStudents();
  }, [pagination, query]);

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

      <ModelForm
        title={!!editingStudent ? "Edit Student" : "Add Student"}
        visible={isModalVisible}
        handleCancel={handleModalCancel}
      >
        <AddEditForm
          handleFormSubmit={handleFormSubmit}
          student={editingStudent}
        />
      </ModelForm>
    </>
  );
}
