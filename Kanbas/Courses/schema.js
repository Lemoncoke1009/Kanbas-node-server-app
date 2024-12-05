import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
 {
   _id: {
     type: String,
     default: () => 'RS' + Math.floor(Math.random() * 9000 + 1000),  // Generates IDs like RS1234
     required: true
   },
   name: String,
   number: String,
   credits: Number,
   description: String,
 },
 { 
   collection: "courses",
   _id: false  // Disable auto-generation of ObjectId
 }
);

export default courseSchema;