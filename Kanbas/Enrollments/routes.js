import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments", async (req, res) => {
      const enrollments = await dao.getAllEnrollments();
      res.send(enrollments);
  });
}
  app.delete("/api/courses/:userId/:courseId/unenroll", (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.params;
    dao.unenrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  });
