import { Schema, Types ,model} from "mongoose";

const messageSchema = new Schema({
  content:{
    type:String,
    required:true,
  },
  reciverId:{
    type:Types.ObjectId,
    required:true,
  }
},{timestamps:true});

const messageModel=model('message',messageSchema)
export default messageModel;
