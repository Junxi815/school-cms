import { User } from "./user";

export type MessageType = "notification" | "message";

export interface Message {
  createdAt: string;
  id: number;
  content: string;
  status: number;
  from: Omit<User, "email">;
  type: MessageType;
}
