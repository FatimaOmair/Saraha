import userModel from "../../../DB/model/user.model.js"
import cloudinary from "../../utils/cloudinary.js"

export const viewProfile=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id)
    return res.json({message:"success",user})
}


export const uploadImage=async(req,res,next)=>{
    const {secure_url}=await cloudinary.uploader.upload(req.file.path)
    const user=await userModel.findByIdAndUpdate(req.user._id,{profilePic:secure_url},{new:true})
  return res.json({message:"success",user});  
}

