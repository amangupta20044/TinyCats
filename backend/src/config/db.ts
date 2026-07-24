import mongoose from "mongoose";

export const connectDb=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/project1")
        console.log("mongodb connected")
    }catch(error){
        console.log("error in mongodb",error);
    }
};