import {User} from './user.model';
import {Quizz} from './quizz.dto';

export interface QuizAttempt {
  id: number;
  score: number;
  totalQuestions: number;
  createdAt: Date;
  user: User;
  quiz: Quizz;
}
