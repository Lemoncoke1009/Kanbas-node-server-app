import Database from "../Database/index.js";
  
export function createGrade(grade) {
    const newGrade = { ...grade, _id: Date.now().toString() };
    Database.grades = [...Database.grades, newGrade];
    return newGrade;
  }
  
export function findGradesForQuizAndUser(quizId, userId) {
  const { grades } = Database;
  return grades.filter((grade) => grade.quiz === quizId && grade.user === userId);
}
