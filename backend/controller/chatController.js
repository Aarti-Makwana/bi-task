import { json, request } from "express";
import chatModel from "../model/chatModal.js"
export const createChatController =async (request,response)=>{
    console.log("Hi inside creta char",request.body);

    try {
        const chats = await chatModel.find({
            members: {
                $all: [request.body.senderId, request.body.reciverId]
            }
        });
        console.log("chat ----- ",chats);
        if (chats.length==0) {
         const newChat = new  chatModel({ members:[request.body.senderId,request.body.reciverId]});
         newChat.save();
         console.log("THis new chat id",newChat);
         response.status(200).json({chatID:newChat._id})
    }

    else{
        console.log("chat already exsist",chats[0]._id);
        response.status(200).json({chatID:chats[0]._id})
    } 

} 
catch (error) {
    response.status(500).json(error)
    console.log("error 58",error);
}

}

export const userChatsController = async (request,response)=>{
    try {
        const chats = await chatModel.find({ 
            members:{$in:[request.params.userId]}
        })
        response.status(200).json(chats)
    } catch (error) {
        console.error("Error in userChatsController",error);
        response.status(500).json(error)
    }
}

export const findChatController = async (request,response)=>{
    try {
         const chat=await chatModel.findOne({
            members:{$all:[request.params.firstId,request.params.secondId]}
        })
        response.status(200).json(chat)
        
    } catch (error) {
        console.error("Error in findChatController",error);
        response.status(500).json(error)
    }
} 