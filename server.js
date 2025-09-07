import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import gameSocket from "./socket/index.js";

const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

// Socket.io logic
gameSocket(io);

const PORT = 5001;

server.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
