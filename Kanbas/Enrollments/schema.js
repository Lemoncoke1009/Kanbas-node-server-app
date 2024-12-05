import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    course: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "CourseModel",
      required: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "UserModel",
      required: true 
    },
    grade: { type: Number, min: 0, max: 100 },
    letterGrade: String,
    enrollmentDate: { 
      type: Date, 
      default: Date.now,
      required: true 
    },
    status: {
      type: String,
      enum: ["ENROLLED", "DROPPED", "COMPLETED"],
      default: "ENROLLED",
      required: true
    },
  },
  { 
    collection: "enrollments",
    timestamps: true,
    // Add compound index to prevent duplicate enrollments
    indexes: [{ unique: true, fields: ['user', 'course'] }]
  }
);

export default enrollmentSchema;