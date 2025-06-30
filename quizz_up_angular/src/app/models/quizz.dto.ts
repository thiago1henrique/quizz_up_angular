export interface Alternative {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  title: string;
  alternatives: Alternative[];
}

export interface Quizz {
  id: number;
  title: string;
  description: string;
  image: string;
  logo: string;
  questions: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}
