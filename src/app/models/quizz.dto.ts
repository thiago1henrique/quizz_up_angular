export interface Option {
  key: string;
  label: string;
}

export interface Question {
  id: number;
  topic: string;
  question: string;
  options: Option[];
  correct: string;
}
export interface Quizz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

