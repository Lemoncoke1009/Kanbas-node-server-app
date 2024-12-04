import model from "./model.js";

export function findAllCourses() {
  return model.find();
}
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}

export function createCourse(course) {
  delete course._id;
  return model.create(course);
}


export async function updateCourse(courseId, courseUpdates) {
  if (!courseId) {
      throw new Error('Course ID is required');
  }
  
  const { _id, ...updates } = courseUpdates;
  
  return model.findByIdAndUpdate(
      courseId,
      { $set: updates },
      { new: true }
  );
}
 

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
 }
 
  
  
  