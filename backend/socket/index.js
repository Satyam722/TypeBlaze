import { v4 as uuidv4 } from "uuid";

const rooms = {}; // roomId → array of userIds

export default function gameSocket(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // CREATE ROOM
    socket.on("createRoom", () => {
      const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
      const userId = uuidv4();

      if (!rooms[roomId]) rooms[roomId] = [];
      rooms[roomId].push(userId);

      socket.join(roomId);
      console.log(`Room ${roomId} created by user ${userId}`);

      // Emit back to the creator
      socket.emit("roomCreated", { roomId, userId });
    });

    // JOIN ROOM
    socket.on("joinRoom", (roomId) => {
      if (!rooms[roomId]) {
        socket.emit("error", "Room not found!");
        return;
      }
      const userId = uuidv4();
      rooms[roomId].push(userId);
      socket.join(roomId);

      console.log(`User ${userId} joined room ${roomId}`);

      // Notify all users in the room
      io.to(roomId).emit("userJoined", { userId, roomId });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
