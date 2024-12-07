import Database from "../Database/index.js";
export function findQuizzesByCourse(courseId) {
  return Database.quizzes.filter((quiz) => quiz.course === courseId);
}

export function findQuizById(quizId) {
  return Database.quizzes.find((quiz) => quiz._id === quizId);
}

export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: Date.now().toString() };
  Database.quizzes = [...Database.quizzes, newQuiz];
  return newQuiz;
}

export function deleteQuiz(quizId) {
  const { quizzes } = Database;
  Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
}

export function updateQuiz(quizId, quizUpdates) {
  const { quizzes } = Database;
  const quiz = quizzes.find((quiz) => quiz._id === quizId);
  Object.assign(quiz, quizUpdates);
  return quiz;
}

  
  
  