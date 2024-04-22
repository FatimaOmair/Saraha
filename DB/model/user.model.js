import { Schema ,model} from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['male', 'female'], 
    },
    confirmEmail:{
        type:Boolean,
        default: false,
    },
    profilePic:{
      type:String,  
    }
},{timestamps:true});

const userModel=model('user',userSchema)
export default userModel;
