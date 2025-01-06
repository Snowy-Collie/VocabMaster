export interface Word {
  id: string;
  english: string;
  chinese: string;
  createdAt: Date;
  groupId: string;
}

export interface Group {
  id: string;
  name: string;
  createdAt: Date;
}

export type QuizType = 'multiple-choice' | 'spelling' | 'flashcard';

export interface FlashcardWord extends Word {
  status: 'unknown' | 'known';
}