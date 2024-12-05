import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModel",
      required: true 
    },
    description: { type: String, default: "" },
    dueDate: { type: Date, required: true },
    availableFrom: { type: Date, required: true },
    untilDate: { type: Date, required: true },
    points: { type: Number, required: true, default: 100 }
  },
  { 
    collection: "assignments2",
    timestamps: true 
  }
);

export default schema;