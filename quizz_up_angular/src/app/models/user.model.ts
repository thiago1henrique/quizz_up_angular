export interface QuizHistory {
  id: number;
  title: string;
  score: number;
  total: number;
  logo: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  userProfile?: string;
  password?: string;
  role?: string;
  isAdmin?: boolean;
  quizHistory?: QuizHistory[];
}
