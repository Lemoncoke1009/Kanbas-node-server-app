import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: { 
      type: String,  
      ref: "CourseModel" 
    },
  },
  { 
    collection: "modules",
    timestamps: true
  }
);
export default schema;