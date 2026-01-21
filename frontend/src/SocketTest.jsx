import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function SocketTest() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  useEffect(() => {
    // Create socket connection
    const newSocket = io("http://localhost:5001", {
      transports: ["websocket"], // force websocket (more stable for dev)
    });
    setSocket(newSocket);

    // Connection success
    newSocket.on("connect", () => {
      console.log("✅ Connected to backend with ID:", newSocket.id);
    });

    // Room Created
    newSocket.on("roomCreated", ({ roomId, userId }) => {
      setRoomId(roomId);
      setUserId(userId);
      alert(`Room Created!\nRoom ID: ${roomId}\nYour User ID: ${userId}`);
    });

    // User Joined
    newSocket.on("userJoined", ({ userId, roomId }) => {
      alert(`🎉 User ${userId} joined room ${roomId}`);
    });

    // Error
    newSocket.on("error", (message) => {
      alert(`❌ ${message}`);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Create Room
  const handleCreateRoom = () => {
    if (socket) {
      socket.emit("createRoom");
    }
  };

  // Join Room
  const handleJoinRoom = () => {
    if (socket && joinRoomId.trim()) {
      socket.emit("joinRoom", joinRoomId.trim());
    } else {
      alert("⚠️ Enter a room ID to join!");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>⚡ Socket.IO Room Test</h1>

      <button onClick={handleCreateRoom} style={{ marginBottom: "1rem" }}>
        ➕ Create Room
      </button>

      {roomId && (
        <p>
          ✅ Room <b>{roomId}</b> created! <br /> Your User ID: <b>{userId}</b>
        </p>
      )}

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Enter Room ID to join"
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleJoinRoom}>🔗 Join Room</button>
      </div>
    </div>
  );
}
