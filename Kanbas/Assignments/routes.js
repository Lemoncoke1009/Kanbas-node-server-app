import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignment = {
        ...req.body,
        course: courseId,
        dueDate: new Date(req.body.dueDate),
        availableFrom: new Date(req.body.availableFrom),
        untilDate: new Date(req.body.untilDate)
      };
      const newAssignment = await assignmentsDao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const status = await assignmentsDao.deleteAssignment(assignmentId);
      if (status.deletedCount === 0) {
        res.status(404).json({ message: "Assignment not found" });
        return;
      }
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;
      const updatedAssignment = await assignmentsDao.updateAssignment(
        assignmentId, 
        assignmentUpdates
      );
      if (!updatedAssignment) {
        res.status(404).json({ message: "Assignment not found" });
        return;
      }
      res.json(updatedAssignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}