import model from "./model.js";

//export function enrollUserInCourse(userId, courseId) {
  //const { enrollments } = Database;
  //enrollments.push({ _id: Date.now(), user: userId, course: courseId });
//}
//export function unenrollUserInCourse(userId, courseId) {
  //const { enrollments } = Database;
  //Database.enrollments = enrollments.filter(
    //(enrollment) =>
     // !(enrollment.user === userId && enrollment.course === courseId)
  //);
//}

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId })
    .populate("course")
    .lean();
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId })
    .populate("user")
    .lean();
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
  console.log("Enrolling user:", user, "in course:", course);
  return model.create({ 
    user: user.toString(),
    course: course.toString(),
    enrollmentDate: new Date(),
    status: "ENROLLED"
  });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ 
    user: user.toString(), 
    course: course.toString() 
  });
}
 

 
 