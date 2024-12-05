import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String,
      default: ""
    },
    course: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModel",
      required: true 
    }
  },
  { 
    collection: "modules",
    timestamps: true 
  }
);

export default schema;