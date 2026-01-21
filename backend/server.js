import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import connectDB from "./db.js";
import Room from "./models/Room.js";
import dotenv from "dotenv";

// Load env vars
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  },
});

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running and connected to MongoDB!");
});

// Socket.io events
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // CREATE ROOM
  socket.on("createRoom", async () => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const userId = uuidv4();

    // Save room in MongoDB
    const newRoom = new Room({ roomId, users: [{ userId }] });
    await newRoom.save();

    socket.join(roomId);
    console.log(`Room ${roomId} created by ${userId}`);

    socket.emit("roomCreated", { roomId, userId });
  });

  // JOIN ROOM
  socket.on("joinRoom", async (roomId) => {
    const room = await Room.findOne({ roomId });
    if (!room) {
      socket.emit("error", "Room not found!");
      return;
    }

    const userId = uuidv4();
    room.users.push({ userId });
    await room.save();

    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);

    io.to(roomId).emit("userJoined", { userId, roomId });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
