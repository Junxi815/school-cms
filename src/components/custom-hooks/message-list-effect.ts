import { useState, useEffect } from "react";
import { getMessage } from "../../lib/services/api";
import { Pagination } from "../modal/api";
import { Message, MessageType } from "../modal/message";

interface ReqMessageParams {
  limit: number;
  page: number;
  userId: number;
  type: MessageType;
}

export function useMessageList(reqInfo: Partial<ReqMessageParams>) {
  const [data, setData] = useState<Message[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 20,
    page: 1,
  });
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { type, userId } = reqInfo;
      const reqParams = !!type
        ? { ...pagination, ...reqInfo }
        : { ...pagination, userId };
      const result = await getMessage(reqParams);

      if (result.data) {
        const { total, messages } = result.data;
        const newData = data.concat(messages);
        setData(newData);
        setHasMore(newData.length < total);
      }
    })();
  }, [pagination, reqInfo]);

  return { data, hasMore, pagination, setPagination };
}
