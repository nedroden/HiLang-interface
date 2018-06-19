import { Flashcard } from './flashcard';
import { Lesson } from './lesson';

export class ExerciseResult {
    vocabulary: Flashcard[] = [];
    lessonTime: number;
    lesson: Lesson;
    method: string;
    grade: number;
}