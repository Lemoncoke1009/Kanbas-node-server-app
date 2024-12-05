import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const module = {
        ...req.body,
        course: courseId
      };
      const newModule = await modulesDao.createModule(module);
      res.status(201).json(newModule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      await modulesDao.deleteModule(moduleId);
      res.sendStatus(204);
    } catch (error) {
      if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      const updatedModule = await modulesDao.updateModule(moduleId, moduleUpdates);
      res.json(updatedModule);
    } catch (error) {
      if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });
}