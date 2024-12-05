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

export const createUser = async (user) => {
  try {
    const { _id, ...userData } = user;
    return await model.create(userData);
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Username already exists");
    }
    throw error;
  }
};

export const findAllUsers = async () => {
  try {
    return await model.find().lean();
  } catch (error) {
    console.error("Error finding users:", error);
    throw error;
  }
};

export const findUserById = async (userId) => {
  try {
    const id = toObjectId(userId);
    const user = await model.findById(id).lean();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  try {
    return await model.findOne({ username }).lean();
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};

export const findUserByCredentials = async (username, password) => {
  try {
    return await model.findOne({ username, password }).lean();
  } catch (error) {
    console.error("Error finding user by credentials:", error);
    throw error;
  }
};

export const updateUser = async (userId, user) => {
  try {
    const id = toObjectId(userId);
    const { _id, ...updates } = user;
    
    const updatedUser = await model.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
    
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const id = toObjectId(userId);
    const result = await model.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error("User not found");
    }
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const findUsersByRole = async (role) => {
  try {
    return await model.find({ role }).lean();
  } catch (error) {
    console.error("Error finding users by role:", error);
    throw error;
  }
};

export const findUsersByPartialName = async (partialName) => {
  try {
    const regex = new RegExp(partialName, "i");
    return await model.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } }
      ]
    }).lean();
  } catch (error) {
    console.error("Error finding users by name:", error);
    throw error;
  }
};