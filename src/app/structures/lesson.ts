import { Flashcard } from './flashcard';

export class Lesson {
    id: number;
    name: string;
    category: string;
    description: string;
    course;
    type;
    vocabulary: Flashcard[];
}
