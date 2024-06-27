"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = (0, express_1["default"])();
var port = process.env.PORT || 3000;
var server = http_1["default"].createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
io.on('connection', function (socket) {
    console.log("\u26A1: ".concat(socket.id, " user just connected!"));
    io.emit('userConnected', { message: "New user connected: ".concat(socket.id) });
    socket.on('customEvent', function (data) {
        console.log('Received custom event:', data);
        socket.emit('customResponse', { message: 'Event received successfully' });
    });
    socket.on('disconnect', function () {
        console.log('🔥: A user disconnected');
        io.emit('userDisconnected', { message: "User disconnected: ".concat(socket.id) });
    });
});
app.get('/api', function (req, res) {
    res.json({ message: "Hello world" });
});
app.get("/", function (req, res) {
    res.send("Express + TypeScript Server with Socket.IO");
});
server.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
console.log('🚀: Server started');
