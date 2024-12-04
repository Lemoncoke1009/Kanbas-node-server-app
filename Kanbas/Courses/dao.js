import model from "./model.js";

export function findAllCourses() {
  return model.find().lean();
}
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}

export function createCourse(course) {
  const { _id, ...courseData } = course;
  return model.create(course);
}


export function updateCourse(courseId, courseUpdates) {

  const { _id, ...updates } = courseUpdates;
  
  console.log("Updating course with ID:", courseId);
  console.log("Updates:", updates);

  return model.findOneAndUpdate(
    { _id: courseId },  
    { $set: updates },
    { 
      new: true,
      runValidators: true 
    }
  );
}
 

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
 }
 
  
  
  