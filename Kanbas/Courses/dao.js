import model from "./model.js";
import mongoose from "mongoose";

const toObjectId = (id) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    console.error("Invalid ID format:", id);
    throw new Error(`Invalid ID format: ${id}`);
  }
};

export async function findAllCourses() {
  try {
    return await model.find().lean();
  } catch (error) {
    console.error("Error finding courses:", error);
    throw error;
  }
}

export async function createCourse(course) {
  try {
    const { _id, ...courseData } = course;
    return await model.create(courseData);
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

export async function deleteCourse(courseId) {
  try {
    const id = toObjectId(courseId);
    return await model.deleteOne({ _id: id });
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}

export async function updateCourse(courseId, courseUpdates) {
  try {
    const id = toObjectId(courseId);
    const { _id, ...updates } = courseUpdates;
    return await model.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
}

export async function findCourseById(courseId) {
  try {
    const id = toObjectId(courseId);
    const course = await model.findById(id).lean();
    if (!course) {
      throw new Error(`Course not found with ID: ${courseId}`);
    }
    return course;
  } catch (error) {
    console.error("Error finding course:", error);
    throw error;
  }
}