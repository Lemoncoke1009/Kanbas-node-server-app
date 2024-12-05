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

export async function findModulesForCourse(courseId) {
  try {
    const courseObjectId = toObjectId(courseId);
    return await model.find({ course: courseObjectId })
      .sort({ createdAt: 1 })
      .lean();
  } catch (error) {
    console.error("Error finding modules:", error);
    throw error;
  }
}

export async function createModule(module) {
  try {
    if (!module.course) {
      throw new Error("Course ID is required");
    }

    const courseObjectId = toObjectId(module.course);
    const newModule = {
      ...module,
      course: courseObjectId
    };
    delete newModule._id;

    return await model.create(newModule);
  } catch (error) {
    console.error("Error creating module:", error);
    throw error;
  }
}

export async function deleteModule(moduleId) {
  try {
    const id = toObjectId(moduleId);
    const result = await model.deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      throw new Error("Module not found");
    }
    
    return result;
  } catch (error) {
    console.error("Error deleting module:", error);
    throw error;
  }
}

export async function updateModule(moduleId, moduleUpdates) {
  try {
    const id = toObjectId(moduleId);
    
    // If course ID is being updated, convert it to ObjectId
    if (moduleUpdates.course) {
      moduleUpdates.course = toObjectId(moduleUpdates.course);
    }

    const updatedModule = await model.findByIdAndUpdate(
      id,
      { $set: moduleUpdates },
      { new: true, runValidators: true }
    );

    if (!updatedModule) {
      throw new Error("Module not found");
    }

    return updatedModule;
  } catch (error) {
    console.error("Error updating module:", error);
    throw error;
  }
}
