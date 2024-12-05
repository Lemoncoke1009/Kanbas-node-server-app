import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    desc: String,
    points: String,
    due: String,
    available: String,
  },
  { collection: "assignments" }
);
export default schema;