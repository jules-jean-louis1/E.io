import { useState, useEffect } from "react";
import socketIO from "socket.io-client";

export const Home = () => {
  const [socket] = useState(() => socketIO("http://localhost:3000"));
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
    console.log("sending message");
    socket.emit("msg", { roomName: roomName, message: roomMessages });
  };


  return (
    <>
      <section className="flex items-start w-screen justify-between h-screen space-x-4">
        <div className="bg-green-100 px-3 w-[10.5rem] h-full">
          {rooms.length > 0 ? (
            <ul>
              {rooms.map((room, index) => (
                <li key={index} className="flex space-x-1">
                  <button
                    onClick={() => {
                      socket.emit("joinRoom", `${room}`);
                      setRoomName(room);
                    }}
                  >
                    {room}
                  </button>
                  <button
                    onClick={() => {
                      socket.emit("leaveRoom", `${room}`);
                    }}
                    className="text-red-500 border border-red-500 rounded-md px-2 py-1"
                  >
                    Leave
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No active rooms</p>
          )}
          <form
            action=""
            method="post"
            onSubmit={(e) => handleJoinRoom(e)}
            className="flex flex-col"
          >
            <input
              type="text"
              placeholder="Enter room name"
              onChange={(e) => setRoomName(e.target.value)}
              className="mb-2 w-fit"
            />
            <button type="submit">Create Room</button>
          </form>
        </div>
        <div className="w-1/2 bg-green-200">
          <h2>Room</h2>
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
                  handlePostMessage();
                }}
              >
                <input
                  type="text"
                  placeholder="Enter message"
                  onChange={(e) => setRoomMessages(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <h1>Socket.IO Chat App</h1>
          <div>
            <ul>
              {receivedMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter message"
              onChange={(e) => setMessages(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
          <p>
            <strong>Status:</strong>{" "}
            {isConnected ? "Connected" : "Disconnected"}
          </p>
        </div>
      </section>
    </>
  );
};
