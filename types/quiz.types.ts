export interface Question {
    id?: number | string;
    question: string;
    options: string[];
    questionIndex?: number; // Optional index for ordering
    correctOption: number; // Index of the correct answer in options
    points: number; // Points awarded for this question
    duration: number; // Duration in seconds to answer this question
}

export interface CreateQuizPayload {
    title: string;
    description: string;
    coverPhoto: File | null;
    isPublished: boolean;
    questions: Question[];
    tags: string[]; // Tags for the quiz from the predefined list
}

export interface QuizTagsResponse {
    quizTags: string[];
}