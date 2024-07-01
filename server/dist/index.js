"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const crud_user_1 = require("./crud/crud_user");
const userRepository_1 = require("./repository/userRepository");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("message", (data) => {
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
app.get("/api", (req, res) => {
    res.json({ message: "Hello world" });
});
app.post("/api/user/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, crud_user_1.createUser)(req.body);
        if ("error" in result) {
            res.status(400).json({ error: result.error });
        }
        else {
            res
                .status(201)
                .json({ message: "User created successfully", user: result });
        }
    }
    catch (error) {
        console.error("Error in /api/user/create route", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/api/users/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, userRepository_1.findAllUsers)();
    res.json(result);
    // res.send("Express + TypeScript Server with Socket.IO");
}));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server with Socket.IO");
});
server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
console.log("🚀: GG");
