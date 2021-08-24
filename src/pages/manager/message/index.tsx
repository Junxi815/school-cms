import {
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
import { Pagination } from "../../../components/modal/api";
import { Message, MessageType } from "../../../components/modal/message";
import InfiniteScroll from "react-infinite-scroll-component";
import { format } from "date-fns";
import { flatten } from "lodash";
import { markAsRead } from "../../../lib/services/api";
import { getUser } from "../../../lib/services/userInfo";
import BackToTop from "../../../components/common/back-to-top";
import { useMessageList } from "../../../components/custom-hooks/message-list-effect";

type DataSource = [string, Message[]][];

export default function MessageShow() {
  const [type, setType] = useState<MessageType>(null); //"notification" | "message"
  const [pagination, setPagination] = useState<Pagination>({
    limit: 20,
    page: 1,
  });

  const { data, hasMore } = useMessageList(pagination, {
    type,
    userId: getUser().userId,
  });

  const [source, setSource] = useState<{ [key: string]: Message[] }>({}); //{'2021-06-30': Message[], ...}
  const [dataSource, setDataSource] = useState<DataSource>([]); //[[string, Message[]],...]

  //[{'2021-06-30':Message[]},{'2021-05-11':Message[]}]
  useEffect(() => {
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
  }, [data]);

  return (
    <>
      <Row align="middle">
        <Col span={8}>
          <Typography.Title level={2}>Recent Messages</Typography.Title>
        </Col>

        <Col span={8} offset={8} style={{ textAlign: "right" }}>
          <Select
            defaultValue={null}
            onSelect={(value) => {
              setType(value);
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
              {values.map((item) => (
                <List.Item
                  key={item.createdAt}
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

                    markAsRead({ ids: [item.id] }).then((res) => {
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
                        // dispatch({
                        //   type: "decrement",
                        //   payload: { count: 1, type: item.type },
                        // });
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
    </>
  );
}
