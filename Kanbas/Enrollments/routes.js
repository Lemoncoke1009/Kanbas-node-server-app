import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const authenticate = (req, res, next) => {
    const user = req.session["currentUser"];
    if (!user) {
      res.status(401).json({ message: "You must be logged in" });
      return;
    }
    next();
  };

  app.post("/api/courses/:userId/:courseId/enroll", authenticate, (req, res) => {
    try {
      const { userId, courseId } = req.params;
      dao.enrollUserInCourse(userId, courseId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/courses/:userId/:courseId/unenroll", authenticate, (req, res) => {
    try {
      const { userId, courseId } = req.params;
      dao.unenrollUserInCourse(userId, courseId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  app.get("/api/courses/:userId/:courseId/enrollment", authenticate, (req, res) => {
    try {
      const { userId, courseId } = req.params;
      const enrollment = dao.findEnrollment(userId, courseId);
      res.json(!!enrollment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}