import connectDB from '../../DB/connection.js';
import messageRouter from './../modules/message/message.router.js'
import authRouter from './auth/auth.router.js'
import userRouter from './user/user.router.js'
const initApp=(app,express)=>{
    app.use(express.json());
    
    connectDB();
    app.get('/',(req,res)=>{
        return res.status(200).json({message:"success"})
     })
    app.use('/message',messageRouter)
    app.use('/auth',authRouter)
    app.use('/user',userRouter)

    app.use((err,req,res,next)=>{
        return res.json({message:err.message})
    } )
}

export default initApp;