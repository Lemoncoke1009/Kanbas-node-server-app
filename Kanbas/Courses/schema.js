import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
 {
   _id: {
     type: String,  
     required: true
   },
   name: String,
   number: String,
   credits: Number,
   description: String,
 },
 { 
   collection: "courses",
   _id: false  
 }
);

export default courseSchema;