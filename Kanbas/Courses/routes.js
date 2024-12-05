import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      const currentUser = req.session["currentUser"];
      if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await dao.findCourseById(courseId);
      const modules = await modulesDao.findModulesForCourse(course._id);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await dao.findCourseById(courseId);
      const module = {
        ...req.body,
        course: course._id,
      };
      const newModule = await modulesDao.createModule(module);
      res.json(newModule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const status = await dao.deleteCourse(courseId);
      await enrollmentsDao.removeEnrollmentsForCourse(courseId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const updatedCourse = await dao.updateCourse(courseId, req.body);
      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await dao.findCourseById(courseId);
      const assignments = await assignmentsDao.findAssignmentsForCourse(course._id);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await dao.findCourseById(courseId);
      const assignment = {
        ...req.body,
        course: course._id,
      };
      const newAssignment = await assignmentsDao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/courses/:cid/users", async (req, res) => {
    try {
      const { cid } = req.params;
      const users = await enrollmentsDao.findUsersForCourse(cid);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}