import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    course: {
      type: String,
      required: true
    },
    lessons: [{
      _id: String,
      name: String,
      description: String,
      module: String
    }]
  },
  { 
    collection: "modules",
    _id: false
  }
);

export default moduleSchema;