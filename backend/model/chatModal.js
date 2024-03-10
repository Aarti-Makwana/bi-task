import mongoose from "mongoose";

const chats = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("chats",chats, "chats");
export default chatModel;