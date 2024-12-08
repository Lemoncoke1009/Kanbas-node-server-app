import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.post("/api/grades/:quizId", (req, res) => {
    const { quizId } = req.params;
    const grade = {
      ...req.body,
      quiz: quizId,
    };
    const newGrade = dao.createGrade(grade);
    res.send(newGrade);
  });

  app.get("/api/grades/:quizId/:userId", (req, res) => {
    const { quizId, userId } = req.params;
    const grade = dao.findGradesForQuizAndUser(quizId, userId);
    res.send(grade);
  });
}

