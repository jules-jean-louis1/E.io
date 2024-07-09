import { FC } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface RoomChatProps {
  setRoomMessages: (value: string) => void;
  roomName?: string;
  activeRoomMsg: any[];
  onSubmit: (e: any) => void;
}
export const RoomChat: FC<RoomChatProps> = (props) => {
  const { setRoomMessages, roomName, activeRoomMsg, onSubmit } = props;
  return (
    <>
      <div className="col-span-9 bg-green-200">
        <h2>{roomName}</h2>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full min-h-72">
            <ul>
              {activeRoomMsg.map((msg, index) => (
                <li key={index}>
                  <p>{msg.message}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <form
              action=""
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
              }}
              className="flex w-full"
            >
              <Input
                placeholder="Enter message"
                onChange={(e) => setRoomMessages(e.target.value)}
              />
              <Button type="submit">Envoyer</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
