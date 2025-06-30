export interface QuizAttempt {
  id?: number;
  userId: number;
  quizId: number;
  score: number;
  totalQuestions: number;
  createdAt?: Date | string;
  quizTitle?: string;
  quizLogo?: string;
}
