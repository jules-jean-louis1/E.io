import express, { Express, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { createUser } from "./crud/crud_user";
import { findAllUsers } from "./repository/userRepository";

const app: Express = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data: any) => {
    console.log("📩: Received message:", data);
    io.emit("message", data);
  });
  // io.emit('userConnected', { message: `New user connected: ${socket.id}` });

  // socket.on('customEvent', (data: any) => {
  //   console.log('Received custom event:', data);

  //   socket.emit('customResponse', { message: 'Event received successfully' });
  // });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    io.emit("userDisconnected", { message: `User disconnected: ${socket.id}` });
  });
});

/****
 * API routes
 */

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

app.post("/api/user/create", async (req: Request, res: Response) => {
  try {
    const result = await createUser(req.body);
    if ("error" in result) {
      res.status(400).json({ error: result.error });
    } else {
      res
        .status(201)
        .json({ message: "User created successfully", user: result });
    }
  } catch (error) {
    console.error("Error in /api/user/create route", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users/", async (req: Request, res: Response) => {
  const result = findAllUsers();
  res.json(result);
  // res.send("Express + TypeScript Server with Socket.IO");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server with Socket.IO");
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
