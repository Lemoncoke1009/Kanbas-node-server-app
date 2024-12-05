import model from "./model.js";

export function updateModule(moduleId, moduleUpdates) {
  return model.findByIdAndUpdate(
    moduleId, 
    { $set: moduleUpdates },
    { new: true, lean: true }
  ).exec();
}
  

export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId }).exec();
}
   

   
export async function createModule(module) {
  try {
   
    const allModules = await model.find({}).sort({ _id: -1 }).limit(1);
    
    let nextId;
    if (allModules.length > 0) {
      const lastModuleId = allModules[0]._id;
      const lastNumber = parseInt(lastModuleId.replace('M', ''));
      nextId = `M${String(lastNumber + 1).padStart(3, '0')}`;
    } else {
      nextId = 'M401'; 
    }
    
    const newModule = {
      _id: nextId,
      name: module.name,
      description: module.description || "",
      course: module.course,
      lessons: []
    };

    console.log("Creating new module with ID:", nextId);
    return model.create(newModule);
  } catch (error) {
    console.error("Error in createModule:", error);
    throw error;
  }
}
   
  
export async function findModulesForCourse(courseId) {
  try {
    console.log("DAO: Finding modules for course:", courseId);
    const modules = await model.find({ course: courseId }).lean();
    console.log("DAO: Found modules:", modules);
    return modules;
  } catch (error) {
    console.error("DAO Error:", error);
    throw error;
  }
}
   
