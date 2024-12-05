import model from "./model.js";

export async function findModulesForCourse(courseId) {
  try {
    console.log("DAO: Finding modules for course:", courseId);
    const modules = await model.find({ 
      course: courseId,
      name: { $exists: true, $ne: "" }  // Filter out empty modules
    }).lean();
    console.log("DAO: Found modules:", modules);
    return modules;
  } catch (error) {
    console.error("DAO Error:", error);
    throw error;
  }
}
  

export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId }).exec();
}
   

   
export async function createModule(module) {
  try {
    if (!module.name) {
      throw new Error("Module name is required");
    }
    
    const lastModule = await model.findOne({}, {}, { sort: { '_id': -1 } });
    let nextId = 'M101';
    if (lastModule && lastModule._id.startsWith('M')) {
      const lastNum = parseInt(lastModule._id.substring(1));
      nextId = `M${lastNum + 1}`;
    }
    
    const newModule = {
      _id: nextId,
      ...module,
      lessons: []
    };
    
    return model.create(newModule);
  } catch (error) {
    console.error("Error creating module:", error);
    throw error;
  }
}
   
  
  export function findModulesForCourse(courseId) {
    return model.find({ course: courseId }).lean().exec();
  }
   
