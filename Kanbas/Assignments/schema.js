import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
    {
        title: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        unlock: Date,
        due: Date,
        description: String,
        points: Number,
    },
    {collection: "assignments"}
);
export default assignmentSchema;