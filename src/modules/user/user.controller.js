import userModel from "../../../DB/model/user.model.js"

export const viewProfile=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id)
    return res.json({message:"success",user})
}