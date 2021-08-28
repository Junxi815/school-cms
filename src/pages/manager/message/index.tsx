import {
  Card,
  Row,
  Col,
  Select,
  Typography,
  Spin,
  List,
  Space,
  Avatar,
  message,
} from "antd";
import {
  AlertOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

import { Message, MessageType } from "../../../components/modal/message";
import InfiniteScroll from "react-infinite-scroll-component";
import { format } from "date-fns";
import { flatten } from "lodash";
import { getMessage, markAsRead } from "../../../lib/services/api";
import { getUser } from "../../../lib/services/userInfo";
import BackToTop from "../../../components/common/back-to-top";
// import { useMessageList } from "../../../components/custom-hooks/message-list-effect";
import { useMsgStatistic } from "../../../components/provider";
import { Pagination } from "../../../components/modal/api";

type DataSource = [string, Message[]][];
const { userId } = getUser();

export default function MessageShow() {
  const [type, setType] = useState<MessageType>(null); //"notification" | "message"
  const [data, setData] = useState<Message[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 20,
    page: 1,
  });
  const [hasMore, setHasMore] = useState<boolean>(true);
  // const { data, hasMore, pagination, setPagination } = useMessageList({
  //   type,
  //   userId: getUser().userId,
  // });
  const [source, setSource] = useState<{ [key: string]: Message[] }>({}); //{'2021-06-30': Message[], ...}
  const [dataSource, setDataSource] = useState<DataSource>([]); //[[string, Message[]],...]
  const { dispatch } = useMsgStatistic();

  //[{'2021-06-30':Message[]},{'2021-05-11':Message[]}]
  useEffect(() => {
    (async () => {
      const reqParams = !!type
        ? { ...pagination, type, userId }
        : { ...pagination, userId };
      const result = await getMessage(reqParams);

      if (result.data) {
        const { total, messages } = result.data;
        const newData = data.concat(messages);
        setData(newData);
        setHasMore(newData.length < total);
      }
    })();
  }, [pagination, type]);

  useEffect(() => {
    if (data.length > 0) {
      const result = data.reduce((acc, cur) => {
        const key = format(new Date(cur.createdAt), "yyyy-MM-dd");

        if (!acc[key]) {
          acc[key] = [cur];
        } else {
          acc[key].push(cur);
        }

        return acc;
      }, source);
      //source : {'2021-06-30': Message[], ...}
      const flattenResult = Object.entries(result).sort(
        (pre, next) => new Date(next[0]).getTime() - new Date(pre[0]).getTime()
      );

      setSource({ ...result });
      setDataSource(flattenResult);
    }
  }, [data]);

  return (
    <Card>
      <Row align="middle">
        <Col span={8}>
          <Typography.Title level={3}>Recent Messages</Typography.Title>
        </Col>

        <Col span={8} offset={8} style={{ textAlign: "right" }}>
          <Select
            defaultValue={null}
            onSelect={(value) => {
              setType(value);
              setData([]);
              setPagination({ ...pagination, page: 1 });
              setSource({});
            }}
            style={{ minWidth: 100 }}
          >
            <Select.Option value={null}>All</Select.Option>
            <Select.Option value="notification">Notification</Select.Option>
            <Select.Option value="message">Message</Select.Option>
          </Select>
        </Col>
      </Row>
      <InfiniteScroll
        next={() => setPagination({ ...pagination, page: pagination.page + 1 })}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        }
        dataLength={flatten(Object.values(source)).length}
        endMessage={<div style={{ textAlign: "center" }}>No more</div>}
        scrollableTarget="root"
        style={{ overflow: "hidden" }}
      >
        <List
          itemLayout="vertical"
          dataSource={dataSource}
          renderItem={([date, values]: [string, Message[]], index) => (
            <>
              <Space size="large">
                <Typography.Title level={4}>{date}</Typography.Title>
              </Space>
              {values.map((item, index) => (
                <List.Item
                  key={item.createdAt + index}
                  style={{ opacity: item.status ? 0.6 : 1 }}
                  actions={[<Space>{item.createdAt}</Space>]}
                  extra={
                    <Space>
                      {item.type === "notification" ? (
                        <AlertOutlined />
                      ) : (
                        <MessageOutlined />
                      )}
                    </Space>
                  }
                  onClick={() => {
                    if (item.status === 1) {
                      return;
                    }

                    markAsRead({ ids: [item.id], status: 1 }).then((res) => {
                      if (res.data) {
                        let target = null;

                        try {
                          dataSource.forEach(([_, values]) => {
                            const result = values.find(
                              (value) => value.id === item.id
                            );

                            if (!!result) {
                              target = result;
                            }
                          });
                        } catch (err) {
                          message.error(err);
                        }

                        target.status = 1;
                        setDataSource([...dataSource]);
                        dispatch({
                          type: "decrement",
                          payload: { count: 1, type: item.type },
                        });
                      }
                    });
                  }}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.from.nickname}
                    description={item.content}
                  />
                </List.Item>
              ))}
            </>
          )}
        ></List>
      </InfiniteScroll>
      <BackToTop />
    </Card>
  );
}
