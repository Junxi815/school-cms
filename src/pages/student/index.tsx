import { Reducer, useEffect, useReducer, useState } from "react";
import {
  Card,
  Col,
  Progress,
  Row,
  Select,
  List,
  Avatar,
  Tooltip,
  Space,
  message,
} from "antd";
import {
  DesktopOutlined,
  SafetyOutlined,
  BulbOutlined,
  ReloadOutlined,
  TeamOutlined,
  HeartFilled,
  CalendarFilled,
} from "@ant-design/icons";
import styled from "styled-components";
import { getCourses, getStatistics } from "../../lib/services/api";
import { ROLE } from "../../lib/constants/role";
import { groupBy } from "lodash";
import { getUser } from "../../lib/services/userInfo";
import { Statistic } from "../../components/modal/statistics";
import { Course } from "../../components/modal/course";
import { Link } from "react-router-dom";
import { DurationUnit } from "../../lib/constants/duration";
import Countdown from "antd/lib/statistic/Countdown";
import { isFuture } from "date-fns";

const OverviewIconCol = styled(Col)`
  display: flex;
  align-items: center;
  & .anticon {
    background: #fff;
    font-size: 32px;
    border-radius: 50%;
    color: #999;
    padding: 24px;
  }
`;
const OverviewCol = styled(Col)`
  color: #fff;
  h2,
  h3 {
    color: #fff;
    margin-bottom: 0;
  }
  h2 {
    font-size: 32px;
  }
  p {
    margin-bottom: 0;
  }
`;

const StyledList = styled(List)`
  .ant-list-item {
    position: relative;
  }
  .ant-list-item-meta-avatar {
    min-width: 200px;
    min-height: 150px;
  }
  .ant-list-item-action {
    position: absolute;
    left: 240px;
    bottom: 30px;
  }
  .ant-list-item-meta-description {
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface StudentOverviewData {
  status: number;
  amount: number;
  total: number;
}

interface StoreState {
  page: number;
  max: number;
  recommend: Course[];
}

type ActionType = "increment" | "reset" | "setMax" | "setRecommend";

type Action = {
  type: ActionType;
  payload?: number | Course[];
};

const initialState: StoreState = { page: 1, max: 0, recommend: [] };

const limit = 5;

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "increment":
      return { ...state, page: state.page + 1 };
    case "reset":
      return { ...state, page: 1 };
    case "setMax":
      return { ...state, max: action.payload as number };
    case "setRecommend":
      return { ...state, recommend: action.payload as Course[] };
    default:
      throw new Error();
  }
}

// function instanceofStudentOverviewData(data: any): data is StudentOverviewData {
//   return data && data.total;
// }
export const Overview = ({ data, title, icon, style }) => {
  const [percent, setPercent] = useState(0);
  const [amount, setAmount] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    if (!!data) {
      const num = "lastMonthAdded" in data ? data.lastMonthAdded : data.amount;
      const percent = parseFloat(String(((num / data.total) * 100).toFixed(2)));
      setPercent(percent);
      const [text, amount] =
        "lastMonthAdded" in data
          ? [`${percent}% Increase in 30 Days`, data.total]
          : [`${percent}% course in ${title}`, data.amount];
      setText(text);
      setAmount(amount);
    }
  }, [data]);

  return (
    <Card style={{ borderRadius: 5, cursor: "pointer", ...style }}>
      <Row>
        <OverviewIconCol span={7}>{icon}</OverviewIconCol>
        <OverviewCol span={17}>
          <h3>{title}</h3>
          <h2>{amount}</h2>
          <Progress
            percent={100 - percent}
            size="small"
            showInfo={false}
            strokeColor="white"
            trailColor="lightgreen"
          />
          <p>{text}</p>
        </OverviewCol>
      </Row>
    </Card>
  );
};

export default function StudentHome() {
  const { userId } = getUser();
  const [overview, setOverview] = useState<Array<StudentOverviewData>>([]);
  const [state, dispatch] = useReducer<Reducer<StoreState, Action>>(
    reducer,
    initialState
  );

  const getOverviewData = (status: number) => {
    const target = overview?.find((item) => item.status === status);

    return target ? target : { status, amount: 0, total: 1 };
  };

  const changeBatch = async () => {
    try {
      const { page } = state;
      const current = page * limit > state.max ? 1 : page; //5>0?1:1 =>1 second time: 2*5>11? current=2
      const {
        data: { courses, total },
      } = await getCourses({ page: current, limit });

      dispatch({ type: page * limit > total ? "reset" : "increment" });
      //1*5>11? -> increment -> state.page=2 #2: 2*5>11? increment page=3

      if (total !== state.max) {
        //11 !== 0 true
        dispatch({ type: "setMax", payload: total }); //state.max = 11
      }

      dispatch({ type: "setRecommend", payload: courses }); //state.recommend = Array<Course> 2# new Array<Course>
    } catch (err) {
      message.error("Something going wrong, please try again later!");
    }
  };

  useEffect(() => {
    getStatistics(ROLE.student, userId).then((res) => {
      if (!!res.data) {
        const { own, recommend } = res.data;
        const ownCourses = (own as Statistic).courses;
        const overview = Object.entries(
          //{ '0': Array, '1': Array }  ->  [["0",Array],["1",Array]]
          groupBy(ownCourses, (item) => item.course.status)
        ).map(([status, values]) => ({
          status: +status,
          total: ownCourses.length,
          amount: (values as Array<Object>).length,
        }));
        setOverview(overview);
        const { courses } = recommend;
        const shuffledRecommend = courses.sort(() => 0.5 - Math.random());
        const randomFiveRecommend =
          courses.length > limit ? shuffledRecommend.slice(0, limit) : courses;
        dispatch({ type: "setRecommend", payload: randomFiveRecommend });
      }
    });
  }, []);

  return (
    <Card>
      <Row align="middle" gutter={[16, 24]} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Overview
            title="Pending"
            icon={<BulbOutlined />}
            data={getOverviewData(0)}
            style={{ background: "#1890ff" }}
          />
        </Col>

        <Col span={8}>
          <Overview
            title="Active"
            icon={<DesktopOutlined />}
            data={getOverviewData(1)}
            style={{ background: "#673bb7" }}
          />
        </Col>

        <Col span={8}>
          <Overview
            title="Done"
            icon={<SafetyOutlined />}
            data={getOverviewData(2)}
            style={{ background: "#ffaa16" }}
          />
        </Col>
      </Row>
      <Card
        title={<h3> Courses you might be interested in </h3>}
        extra={
          <Tooltip title="Change batch">
            <ReloadOutlined
              onClick={changeBatch}
              style={{ color: "#1890ff", fontSize: 18, cursor: "pointer" }}
            />
          </Tooltip>
        }
      >
        <StyledList
          itemLayout="vertical"
          dataSource={state.recommend}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={
                <Countdown
                  title={
                    isFuture(new Date(item.startTime))
                      ? "Countdown"
                      : "In Progress"
                  }
                  value={new Date(item.startTime).getTime()}
                  // format={"D [days] H [hours] m [minutes] s [seconds]"}
                />
              }
              actions={[
                <Space>
                  <TeamOutlined />
                  {item.maxStudents}
                </Space>,
                <Space>
                  <HeartFilled />
                  {item.star}
                </Space>,
                <Space>
                  <CalendarFilled />
                  {item.duration +
                    " " +
                    (item.duration > 1
                      ? DurationUnit[item.durationUnit] + "s"
                      : DurationUnit[item.durationUnit])}
                </Space>,
              ]}
            >
              <List.Item.Meta
                avatar={<img src={item.cover} width="200px" alt="cover" />}
                title={
                  <Link to={`/dashboard/${getUser().role}/courses/${item.id}`}>
                    {item.name}
                  </Link>
                }
                description={item.detail}
              />
            </List.Item>
          )}
        />
      </Card>
    </Card>
  );
}
