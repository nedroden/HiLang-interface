import { Flashcard } from './structures/flashcard';

export abstract class Exercise {
    
    vocabulary: Flashcard[] = [];

    queue: Flashcard[] = [];
    correctWords: Flashcard[] = [];
    incorrectWords: Flashcard[] = [];

    public initialize(): void {
        for (let word of this.vocabulary.sort((a, b) => 0.5 - Math.random()))
            this.queue.push(word);
    }

    public getNext(): Flashcard {
        return this.queue.length > 0 ? this.queue[0] : null;
    }

    public getProgress(): number {
        return this.correctWords.length / this.vocabulary.length;
    }

    public isCorrect(input: string): boolean {
        return input === this.queue[0].translation;
    }

    public removeFromQueue(isCorrect: boolean): boolean {
        if (this.queue.length == 0)
            return false;

        (isCorrect ? this.correctWords : this.incorrectWords).push(this.queue[0]);
        this.queue.shift();

        return true;
    }
}