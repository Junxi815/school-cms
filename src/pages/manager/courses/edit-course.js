import { Card, Row, Col, Input, Select, Tabs } from "antd";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { getCourses } from "../../../lib/services/api";
import { getUser } from "../../../lib/services/userInfo";
import AddCourseForm from "../../../components/courses/add-course-form";
import UpdateChapterForm from "../../../components/courses/update-chapter-form";

const SearchInputGroup = styled(Input.Group)`
  .ant-select:first-child {
    width: 100px;
  }
  .ant-select:last-child {
    width: calc(100% - 100px);
  }
`;

export default function EditCourse() {
  const [searchType, setSearchType] = useState("name");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const search = useCallback(
    debounce((value) => {
      if (!value) {
        return;
      }

      setLoading(true);

      (async () => {
        const result = await getCourses({
          [searchType]: value,
          userId: getUser().userId,
        });
        if (result.data) {
          setSearchResult(result.data.courses);
        }
      })();

      setLoading(false);
    }, 1000),
    [searchType]
  );

  return (
    <Card>
      <Row>
        <Col span={12}>
          <SearchInputGroup compact size="big">
            <Select
              defaultValue="name"
              onChange={(value) => {
                setSearchType(value);
              }}
            >
              <Select.Option value="name">Name</Select.Option>
              <Select.Option value="uid">Code</Select.Option>
              <Select.Option value="type">Category</Select.Option>
            </Select>
            <Select
              showSearch
              placeholder={`Search course by ${searchType}`}
              filterOption={false}
              loading={loading}
              onSearch={(value) => search(value)}
              onSelect={(value) => {
                const course = searchResult.find((item) => item.id === value);
                setCourse(course);
              }}
            >
              {searchResult?.map(({ id, name, teacherName, uid }) => (
                <Select.Option key={id} value={id}>
                  {name} - {teacherName} - {uid}
                </Select.Option>
              ))}
            </Select>
          </SearchInputGroup>
        </Col>
      </Row>
      <Tabs size="large" animated>
        <Tabs.TabPane key="course" tab="Course Detail">
          {/* property is low because below component can be rendered many times when other states are changed */}
          <AddCourseForm course={course} />
        </Tabs.TabPane>

        <Tabs.TabPane key="chapter" tab="Course Schedule">
          <UpdateChapterForm
            courseId={course?.id}
            scheduleId={course?.scheduleId}
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}
