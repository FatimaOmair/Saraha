export const asyncHandler=(fun)=>{
    return (req,res,next)=>{
      fun(req,res,next).catch(err=>{
        return res.json({message:"Catch error",error:err.stack})
      })
    }
}