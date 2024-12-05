import * as dao from "./dao.js";
export default function EnrollmentsRoutes(app) {
    app.get("/api/enrollment", (req, res) => {
        const enrollments = dao.findAllEnrollments();
        res.send(enrollments);
    })
    app.post("/api/enrollment", (req, res) => {
        const { userId, courseId } = req.body;

        const status = dao.enrollUserInCourse(userId, courseId);
        res.send(status)
    });
    app.delete("/api/enrollment/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const status = dao.unenrollUserInCourse(userId, courseId);
        res.send(status);
    });
    
}