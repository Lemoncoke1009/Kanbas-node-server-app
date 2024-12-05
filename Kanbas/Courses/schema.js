import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    },
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    credits: { type: Number, required: true, default: 3 },
    description: { type: String, default: "" }
  },
  { 
    collection: "courses",
    timestamps: true
  }
);

export default courseSchema;