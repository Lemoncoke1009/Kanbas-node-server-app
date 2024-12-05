import * as modulesDao from "./dao.js";


export default function ModuleRoutes(app) {
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("Getting modules for course:", courseId);
      const modules = await modulesDao.findModulesForCourse(courseId);
      console.log("Found modules:", modules);
      res.json(modules || []);
    } catch (error) {
      console.error("Error getting modules:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const moduleData = {
        ...req.body,
        course: courseId,
      };
      console.log("Creating module with data:", moduleData);
      const newModule = await modulesDao.createModule(moduleData);
      res.json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      const updatedModule = await modulesDao.updateModule(moduleId, moduleUpdates);
      res.json(updatedModule);
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ message: "Error updating module", error: error.message });
    }
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      await modulesDao.deleteModule(moduleId);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).json({ message: "Error deleting module", error: error.message });
    }
  });
}
 
 
 
 
