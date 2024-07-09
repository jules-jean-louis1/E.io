import React from "react";
import socketIO from "socket.io-client";


export const socket = socketIO("http://localhost:3000");
export const SocketContext = React.createContext(socket);