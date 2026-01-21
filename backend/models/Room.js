import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  users: [{ userId: String }],
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
