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

export async function findAssignmentsForCourse(courseId) {
  try {
    const courseObjectId = toObjectId(courseId);
    return await model.find({ course: courseObjectId }).sort({ dueDate: 1 });
  } catch (error) {
    console.error("Error finding assignments:", error);
    return [];
  }
}

export async function createAssignment(assignment) {
  try {
    if (!assignment.course) {
      throw new Error("Course ID is required");
    }
    const courseObjectId = toObjectId(assignment.course);
    const newAssignment = {
      ...assignment,
      course: courseObjectId
    };
    delete newAssignment._id;
    return await model.create(newAssignment);
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
}

export async function deleteAssignment(assignmentId) {
  try {
    const id = toObjectId(assignmentId);
    return await model.deleteOne({ _id: id });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
}

export async function updateAssignment(assignmentId, assignmentUpdates) {
  try {
    const id = toObjectId(assignmentId);
    // Ensure course ID is converted if present
    if (assignmentUpdates.course) {
      assignmentUpdates.course = toObjectId(assignmentUpdates.course);
    }
    return await model.findByIdAndUpdate(
      id, 
      { $set: assignmentUpdates },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw error;
  }
}