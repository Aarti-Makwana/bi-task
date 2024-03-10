import mongoose from "mongoose";

const messages = new mongoose.Schema({
    chatId:{
        type:String,
        
      },
      senderId:{
        type:String,

      },
      text:{
        type:String
      }
},{
    timestamps:true
}
);

const messagesModal = mongoose.model("messages",messages, "messages");
export default messagesModal;