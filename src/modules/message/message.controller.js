import messageModel from "../../../DB/model/message.model.js";
import userModel from "../../../DB/model/user.model.js";

export const getMessages=async(req,res)=>{
    const messageList=await messageModel.find({reciverId:req.user._id})
    return res.json({message:"success",messageList})
}


export const sendMessage=async(req,res)=>{
    const {reciverId}=req.params;
    const {message}=req.body
    const user =await userModel.findById(reciverId)

    if(!user){
        return res.status(404).json({message:"user not found"})

    }
    const createMessage= await messageModel.create({content:message,reciverId})
    return res.status(201).json({message:"success",createMessage})

}