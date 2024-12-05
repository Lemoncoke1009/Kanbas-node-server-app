import * as dao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  app.post("/api/enrollments", async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      if (!userId || !courseId) {
        return res.status(400).json({ 
          message: "Both userId and courseId are required" 
        });
      }

      const newEnrollment = await dao.enrollUserInCourse(userId, courseId);
      res.status(201).json(newEnrollment);
    } catch (error) {
      if (error.message.includes("already enrolled")) {
        res.status(409).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

  app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      await dao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(204);
    } catch (error) {
      if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

  app.get("/api/enrollments/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const enrollments = await dao.findCoursesForUser(userId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Add a new endpoint to get course enrollments
  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const users = await dao.findUsersForCourse(courseId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}