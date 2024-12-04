import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";

export default function CourseRoutes(app) {

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  });
 
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    try {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        
        console.log("Received update request for course:", courseId);
        console.log("Update data:", courseUpdates);

        const updatedCourse = await dao.updateCourse(courseId, courseUpdates);
        
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        res.json(updatedCourse);
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ 
            message: "Error updating course", 
            error: error.message 
        });
    }
});

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments/new", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
        course: courseId,
        title: req.body.title,
        description: req.body.description || "",
        points: req.body.points || 100,
        dueDate: req.body.dueDate || "2024-05-13T23:59",
        availableFrom: req.body.availableFrom || "2024-05-16T23:59",
        availableUntil: req.body.availableUntil || "2024-05-20T23:59",
    };
    const newAssignment = assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
});



}

