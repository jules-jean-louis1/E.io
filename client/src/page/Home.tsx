import { useState, useEffect, useContext } from "react";
import { GeneralChat } from "../components/chat/GeneralChat";
import { SocketContext } from "../context/Socket";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { RoomChat } from "../components/chat/RoomChat";

export const Home = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState("");
  const [roomMessages, setRoomMessages] = useState("");
  const [rooms, setRooms] = useState<string[]>([]);
  const [roomName, setRoomName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState<any[]>([]);
  const [activeRoomMsg, setActiveRoomMsg] = useState<any[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`⚡: ${socket.id} user just connected!`);
      setIsConnected(true);
    });

    socket.on("activeRooms", (data) => {
      setRooms(data);
    });

    socket.on("message", (data) => {
      console.log("📩: Received message:", data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("msg", (data) => {
      console.log("📩: Received message:", data);
      setActiveRoomMsg((prevMessages) => [...prevMessages, data]);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("message");
      socket.off("msg");
      socket.off("activeRooms");
      socket.off("disconnect");
    };
  }, [socket]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (messages.length > 0) {
      socket.emit("message", messages);
      setMessages("");
    }
  };

  const handleJoinRoom = (e: any) => {
    e.preventDefault();
    socket.emit("joinRoom", roomName);
  };

  const handlePostMessage = () => {
    if (!roomMessages || !roomName) return;
    socket.emit("msg", { roomName: roomName, message: roomMessages });
  };

  return (
    <>
      <section
        className={`w-screen h-6 flex justify-center ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <p>
          <strong>Status:</strong> {isConnected ? "Connected" : "Disconnected"}
        </p>
      </section>
      <section className="grid grid-cols-12 gap-3 w-screen h-[calc(100vh-24px)]">
        <div className="p-3 col-span-3 h-full bg-white border-r border-[#a8b3cf]">
          {rooms.length > 0 ? (
            <ul className="w-full py-4">
              {rooms.map((room, index) => (
                <li key={index} className="flex space-x-1">
                  <Button
                    onClick={() => {
                      socket.emit("joinRoom", `${room}`);
                      setRoomName(room);
                    }}
                  >
                    {room}
                  </Button>
                  <Button
                    onClick={() => {
                      socket.emit("leaveRoom", `${room}`);
                    }}
                    variant="destructive"
                  >
                    Quitter
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune Room Active</p>
          )}
          <form
            action=""
            method="post"
            onSubmit={(e) => handleJoinRoom(e)}
            className="flex flex-col"
          >
            <Input
              placeholder="Enter room name"
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Button type="submit" className="flex">
              <Plus />
              Crée un room
            </Button>
          </form>
        </div>
        <RoomChat
          setRoomMessages={setRoomMessages}
          roomName={roomName}
          activeRoomMsg={activeRoomMsg}
          onSubmit={handlePostMessage}
        />
      </section>
      <div>
        <GeneralChat
          setMessages={setMessages}
          receivedMessages={receivedMessages}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};
