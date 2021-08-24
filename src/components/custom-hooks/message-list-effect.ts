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

export function useMessageList(
  pagination: Pagination,
  reqInfo: Partial<ReqMessageParams>
): { data: Message[]; hasMore: boolean } {
  const [data, setData] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const result = await getMessage({
        ...pagination,
        ...reqInfo,
      });
      if (result.data) {
        const { total, messages } = result.data;
        const newData = data.concat(messages);
        setData(newData);
        setHasMore(newData.length < total);
      }
    })();
  }, [pagination, reqInfo]);

  return { data, hasMore };
}
