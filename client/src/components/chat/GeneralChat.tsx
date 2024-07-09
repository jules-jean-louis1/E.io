import { FC } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface GeneralChatProps {
  setMessages: (value: string) => void;
  receivedMessages: any[];
  onSubmit: (e: any) => void;
}

export const GeneralChat: FC<GeneralChatProps> = (props) => {
  const { setMessages, receivedMessages, onSubmit } = props;
  return (
    <>
      <div className="absolute bottom-0 right-0 px-2 py-4 rounded-md border bg-slate-300 min-h-48 w-52">
        <h1>Socket.IO Chat App</h1>
        <div className="flex flex-col justify-between w-full">
          <div className="flex-1 w-full">
            <ul>
              {receivedMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={onSubmit} className="h-6 flex w-fit">
            <Input placeholder="Enter message" onChange={(e) => setMessages(e.target.value)} />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </>
  );
};
