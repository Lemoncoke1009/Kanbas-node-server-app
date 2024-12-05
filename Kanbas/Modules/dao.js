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
    const { _id, ...moduleData } = module;
    
    const lastModule = await model.findOne({}, {}, { sort: { '_id': -1 } });
    let nextId;
    if (lastModule && lastModule._id.startsWith('M')) {
      const lastNum = parseInt(lastModule._id.slice(1));
      nextId = `M${String(lastNum + 1).padStart(3, '0')}`;
    } else {
      nextId = 'M101';
    }
    
    const newModule = {
      _id: nextId,
      ...moduleData,
      lessons: []
    };
    
    const createdModule = await model.create(newModule);
    return createdModule.toObject();
  } catch (error) {
    console.error("Error creating module:", error);
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
   
