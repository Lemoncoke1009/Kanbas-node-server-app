import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
 {
   name: String,
   number: String,
   credits: Number,
   description: String,
 },
 { 
   collection: "courses",
   toJSON: { virtuals: true },
   toObject: { virtuals: true },
   _id: true
 }
);

courseSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export default courseSchema;