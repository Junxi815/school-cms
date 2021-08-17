import {
  message,
  Button,
  Card,
  Table,
  Input,
  Space,
  Popconfirm,
  Typography,
  Layout,
} from "antd";
import { useEffect, useState } from "react";
import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../../lib/services/api";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
// import { formatDistanceToNow } from "date-fns";
import { useDebouncedSearch } from "../../../components/custom-hooks/debounce-search";
import ModelForm from "../../../components/modal/modal-form";
import AddEditForm from "../../../components/teachers/add-edit-form";
import { studentTypes } from "../../../lib/constants/student-types";
import { assign, findKey } from "lodash";
// import { useFormatMenuConfig } from "../../../components/custom-hooks/menu-config";
// import { StateContext } from "../../dashboardchild";

const { Search } = Input;
const TextLink = Typography.Link;

export default function Teachers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageSize: 20, current: 1 });
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const debouncedQuery = useDebouncedSearch(setQuery);

  const columns = [
    {
      title: "No.",
      key: "no",
      render: (_1, _2, index) => index + 1,
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
      render: (_, record) => (
        <Link to={`/dashboard/manager/teachers/${record.id}`}>
          {record.name}
        </Link>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      filters: [
        { text: "China", value: "China" },
        { text: "New Zealand", value: "New zealand" },
        { text: "Canada", value: "Canada" },
        { text: "Australia", value: "Australia" },
      ],
      onFilter: (value, record) => record.country.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => {
        return skills?.map((skill) => skill.name).join(", ");
      },
    },
    {
      title: "Course Amount",
      dataIndex: "courseAmount",
      key: "courseAmount",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
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
            title="Are you sure to delete?"
            onConfirm={() => deleteRecord(record)}
          >
            <TextLink>Delete</TextLink>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const editAction = (teacher) => {
    setEditingTeacher(teacher);
    setModalVisible(true);
  };
  const addAction = () => {
    setEditingTeacher(null);
    setModalVisible(true);
  };

  const deleteRecord = async (teacher) => {
    const result = await deleteTeacher(teacher.id);

    if (result.code >= 200 && result.code < 300) {
      const index = data.findIndex((item) => item.id === teacher.id);
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
    const result = !!editingTeacher
      ? await updateTeacher({ id: editingTeacher.id, ...formValues })
      : await addTeacher(formValues);

    if (result.code >= 200 && result.code < 300) {
      setModalVisible(false);
      message.success(result.msg);
      if (!!editingTeacher) {
        const index = data.findIndex((item) => item.id === editingTeacher.id);
        const { type, name, country, email } = formValues;
        const typeName = findKey(studentTypes, (value) => value === type);

        const obj = {
          type: { id: formValues.type, name: typeName },
          name,
          country,
          email,
        };
        assign(data[index], obj);
        setData([...data]);
      }
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      const reqParams = !!query
        ? {
            limit: pagination.pageSize,
            page: pagination.current,
            query: query,
          }
        : { limit: pagination.pageSize, page: pagination.current };

      setLoading(true);
      const { data } = await getTeachers(reqParams);
      if (!!data) {
        const { teachers, total } = data;
        setData(teachers);
        setTotal(total);
      }
      setLoading(false);
    };
    fetchTeachers();
  }, [pagination, query]);

  return (
    <Layout>
      <Card
        title={
          <Button type="primary" onClick={addAction}>
            <PlusOutlined />
            Add
          </Button>
        }
        extra={
          <Search
            placeholder="search by name"
            onSearch={(value) => setQuery(value)}
            onChange={debouncedQuery}
            style={{ width: "250px" }}
          />
        }
      >
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
        title={!!editingTeacher ? "Edit Teacher" : "Add Teacher"}
        visible={isModalVisible}
        handleCancel={handleModalCancel}
      >
        <AddEditForm
          handleFormSubmit={handleFormSubmit}
          teacher={editingTeacher}
        />
      </ModelForm>
    </Layout>
  );
}
