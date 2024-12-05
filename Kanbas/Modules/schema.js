import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  module: String
});

const moduleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => 'M' + Math.floor(Math.random() * 9000 + 1000), // Generates unique IDs like M1234
      required: true
    },
    name: String,
    description: String,
    course: String,
    lessons: [lessonSchema]
  },
  { 
    collection: "modules",
    _id: false  // Disable auto-generation
  }
);

export default moduleSchema;