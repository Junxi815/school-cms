import { Card, Row, Col, Input, Select, Table, Tag, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebouncedSearch } from "../../components/custom-hooks/debounce-search";
import { StudentCourse } from "../../components/modal/course";
import {
  CourseStatusColor,
  CourseStatusText,
} from "../../lib/constants/course";
import { DurationUnit } from "../../lib/constants/duration";
import { getCourses } from "../../lib/services/api";
import { getUser } from "../../lib/services/userInfo";

const { Option } = Select;
const { Search } = Input;

export default function StudentOwnCourses() {
  const [query, setQuery] = useState<string>("");
  const [searchBy, setSearchBy] = useState<"name" | "type">("name");
  const debouncedQuery = useDebouncedSearch(setQuery);
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [data, setData] = useState<Array<StudentCourse>>(null);
  const columns: ColumnsType<StudentCourse> = [
    {
      title: "No.",
      key: "index",
      render: (_1, _2, index) => index + 1,
    },
    {
      title: "Course Name",
      dataIndex: ["course", "name"],
      sortDirections: ["ascend", "descend"],
      sorter: (pre: StudentCourse, next: StudentCourse) => {
        const preCode = pre.course.name.charCodeAt(0);
        const nextCode = next.course.name.charCodeAt(0);

        return preCode > nextCode ? 1 : preCode === nextCode ? 0 : -1;
      },
      render: (_, record: StudentCourse) => (
        <Link to={`/dashboard/student/courses/${record.id}`}>
          {record.course.name}
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: ["course", "status"],
      render: (status: number) => (
        <Tag color={CourseStatusColor[status]}>{CourseStatusText[status]}</Tag>
      ),
    },
    {
      title: "Duration",
      dataIndex: ["course", "duration"],
      render: (value, record: StudentCourse) =>
        `${value} ${DurationUnit[record.course.durationUnit]}`,
    },
    {
      title: "Course Start",
      dataIndex: ["course", "startTime"],
    },
    {
      title: "Category",
      dataIndex: ["course", "typeName"],
    },

    {
      title: "Join Time",
      dataIndex: "createdAt",
      render: (value: string) =>
        formatDistanceToNow(new Date(value), { addSuffix: true }),
    },
  ];

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await getCourses({
        ...pagination,
        userId: getUser().userId,
        name: query,
      });

      if (!!result.data) {
        const { courses, total } = result.data;
        setData(courses);
        setTotal(total);
      } else {
        message.error(result.msg);
      }
    })();
    setLoading(false);
  }, [pagination, query, searchBy]);

  return (
    <Card>
      <Row style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Input.Group compact>
            <Select
              style={{ width: 100 }}
              defaultValue="name"
              onChange={(value: "name" | "type") => setSearchBy(value)}
            >
              <Option value="name">Name</Option>
              <Option value="type">Category</Option>
            </Select>
            <Search
              style={{ width: "50%" }}
              placeholder={`Search by ${searchBy}`}
              onChange={debouncedQuery}
              onSearch={(value) => {
                setQuery(value);
              }}
            />
          </Input.Group>
        </Col>
      </Row>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={{
          ...pagination,
          total,
          showSizeChanger: true,
        }}
        loading={loading}
        onChange={() => setPagination(pagination)}
      />
    </Card>
  );
}
