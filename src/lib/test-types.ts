export type TestMode = "multiple-choice" | "numeric";

export type MultipleChoiceQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type NumericProblem = {
  question: string;
  answer: number;
  tolerance: number;
  unit: string;
  solution: string;
};

export type MultipleChoiceTest = {
  mode: "multiple-choice";
  sectionSlug: string;
  sectionTitle: string;
  questions: MultipleChoiceQuestion[];
};

export type NumericTest = {
  mode: "numeric";
  sectionSlug: string;
  sectionTitle: string;
  problems: NumericProblem[];
};

export type TestResponse = MultipleChoiceTest | NumericTest;
