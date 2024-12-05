import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  module: String
});

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,  
      required: true,
      auto: false  
    },
    name: String,
    description: String,
    course: {
      type: String,
      required: true
    },
    lessons: [lessonSchema]
  },
  { 
    collection: "modules",
    _id: false,  
    timestamps: true
  }
);

export default schema;