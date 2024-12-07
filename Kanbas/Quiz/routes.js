import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.post("/api/quizzes/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = dao.createQuiz(quiz);
    res.send(newQuiz);
  });

  app.put("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = dao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  });

  app.get("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quiz = dao.findQuizById(quizId);
    res.send(quiz);
  });

  app.get("/api/quizzes/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const quizzes = dao.findQuizzesByCourse(courseId);
    res.send(quizzes);
  });
  app.delete("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const status = dao.deleteQuiz(quizId);
    res.send(status);
  });

}

