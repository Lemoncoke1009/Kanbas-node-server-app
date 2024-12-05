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
   

   
   export function createModule(module) {
    delete module._id;
    return model.create(module)
      .then(doc => doc.toObject()); // Convert to plain object
  }
   
  
  export function findModulesForCourse(courseId) {
    return model.find({ course: courseId }).lean().exec();
  }
   
