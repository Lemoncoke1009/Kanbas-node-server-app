import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: { 
      type: String,  // Using String type for course ID
      ref: "CourseModel",
      required: true
    },
  },
  { 
    collection: "modules",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
export default schema;