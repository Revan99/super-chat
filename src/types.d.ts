export type User = {
  name: string;
  friends: User[];
  messages: Message[];
  email: string;
};

export type Message = {
  content: string;
  timestamp: number;
  receiver: string;
};
