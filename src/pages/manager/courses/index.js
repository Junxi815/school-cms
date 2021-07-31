import { useEffect, useState } from "react";
import { List, message, Spin, Button } from "antd";
import { Link } from "react-router-dom";
import { getUser } from "../../../lib/services/userInfo";
import { getCourses } from "../../../lib/services/api";
import InfiniteScroll from "react-infinite-scroll-component";
import CourseOverview from "../../../components/courses/course-overview";
import BackToTop from "../../../components/common/back-to-top";

export default function Courses() {
  const user = getUser();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ limit: 20, page: 1 });
  const [hasMore, setHasMore] = useState(true);
  // const [totalItems, setTotalItems] = useState(0);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      // setLoading(true);
      const result = await getCourses(pagination);
      // setLoading(false);

      if (result.code >= 200 && result.code < 300) {
        const { courses, total } = result.data;
        const newData = data.concat(courses);
        setData(newData);
        // setTotalItems(total);
        setHasMore(total > data.length);
      } else {
        message.error(result.msg);
      }
    };
    fetchCourses();
  }, [pagination]);
  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPagination({ limit: 20, page: pagination.page + 1 })}
        hasMore={hasMore}
        loader={
          <h4 style={{ textAlign: "center" }}>
            <Spin />
          </h4>
        }
        endMessage={<h4 style={{ textAlign: "center" }}>No More Course!</h4>}
        scrollableTarget="contentLayout"
        style={{ overflow: "hidden" }}
      >
        <List
          id="container"
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <CourseOverview {...item}>
                <Link to={`/dashboard/${user.role}/courses/${item.id}`}>
                  <Button type="primary">Read More</Button>
                </Link>
              </CourseOverview>
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
      <BackToTop />
    </>
  );
}
