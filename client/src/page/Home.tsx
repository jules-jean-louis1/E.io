import { useState, useEffect } from "react";
import socketIO from "socket.io-client";

export const Home =() => {
  const [socket] = useState(() => socketIO("http://localhost:3000"));
  const [messages, setMessages] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`⚡: ${socket.id} user just connected!`);
      setIsConnected(true);
    });

    socket.on("message", (data) => {
      console.log("📩: Received message:", data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("message");
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

  return (
    <>
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
          <strong>Status:</strong> {isConnected ? "Connected" : "Disconnected"}
        </p>
      </div>
    </>
  );
}