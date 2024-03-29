import mongoose from "mongoose";

const connectDB=()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{console.log("Connect to database")
}).catch((error)=>{
    console.log(error)
});
}

export default connectDB;