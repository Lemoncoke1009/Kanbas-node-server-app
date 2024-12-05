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

export async function findCoursesForUser(userId) {
  try {
    const userObjectId = toObjectId(userId);
    const enrollments = await model.find({ user: userObjectId })
      .populate("course")
      .lean();
    return enrollments.map((enrollment) => enrollment.course);
  } catch (error) {
    console.error("Error finding courses for user:", error);
    throw error;
  }
}

export async function findUsersForCourse(courseId) {
  try {
    const courseObjectId = toObjectId(courseId);
    const enrollments = await model.find({ course: courseObjectId })
      .populate("user")
      .lean();
    return enrollments.map((enrollment) => enrollment.user);
  } catch (error) {
    console.error("Error finding users for course:", error);
    throw error;
  }
}

export async function enrollUserInCourse(userId, courseId) {
  try {
    const userObjectId = toObjectId(userId);
    const courseObjectId = toObjectId(courseId);

    // Check if enrollment already exists
    const existing = await model.findOne({ 
      user: userObjectId, 
      course: courseObjectId 
    });
    
    if (existing) {
      throw new Error("User is already enrolled in this course");
    }

    return await model.create({
      user: userObjectId,
      course: courseObjectId,
      enrollmentDate: new Date(),
      status: "ENROLLED"
    });
  } catch (error) {
    console.error("Error enrolling user in course:", error);
    throw error;
  }
}

export async function unenrollUserFromCourse(userId, courseId) {
  try {
    const userObjectId = toObjectId(userId);
    const courseObjectId = toObjectId(courseId);
    
    const result = await model.deleteOne({ 
      user: userObjectId, 
      course: courseObjectId 
    });

    if (result.deletedCount === 0) {
      throw new Error("Enrollment not found");
    }

    return result;
  } catch (error) {
    console.error("Error unenrolling user from course:", error);
    throw error;
  }
}

export async function removeEnrollmentsForCourse(courseId) {
  try {
    const courseObjectId = toObjectId(courseId);
    return await model.deleteMany({ course: courseObjectId });
  } catch (error) {
    console.error("Error removing enrollments for course:", error);
    throw error;
  }
}