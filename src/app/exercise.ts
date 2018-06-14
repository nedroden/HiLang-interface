import { Flashcard } from './structures/flashcard';

export abstract class Exercise {

    protected timeout = 2000;

    protected score: number = 0;
    
    protected vocabulary: Flashcard[];

    protected queue: Flashcard[];
    protected correctWords: Flashcard[];
    protected incorrectWords: Flashcard[];

    protected currentWord: Flashcard;

    protected progress: number;

    protected timeInSeconds: number;
    protected timer: number;

    constructor() {
        this.vocabulary = [];
        this.queue = [];
        this.correctWords = [];
        this.incorrectWords = [];

        this.currentWord = new Flashcard;
        this.progress = 0;

        this.timeInSeconds = 0;
    }

    protected initialize(): void {
        for (let word of this.vocabulary.sort((a, b) => 0.5 - Math.random()))
            this.queue.push(word);

        this.currentWord = this.queue[0];
        this.startTimer();
    }

    protected hasNext(): boolean {
        return this.queue.length !== 0;
    }

    protected next(): void {
        if (this.queue.length > 0)
            this.currentWord = this.queue[0];
        else if (this.incorrectWords.length > 0)
            this.nextRound();
        else
            this.exit();
    }

    private updateProgress(): void {
        this.progress = (this.correctWords.length / this.vocabulary.length) * 100;
    }

    protected isCorrect(input: string): boolean {
        return input === this.queue[0].translation;
    }


    protected clear(isCorrect: boolean, input: HTMLInputElement): boolean {
        if (this.queue.length === 0)
            return false;

        (isCorrect ? this.correctWords : this.incorrectWords).push(this.queue[0]);
        this.queue.shift();

        this.updateProgress();
        input.value = '';

        return true;
    }

    protected nextRound(): void {
        this.queue = this.incorrectWords.slice();
        this.incorrectWords = [];

        if (this.queue.length > 0)
            this.next();
    }

    protected getTimeout(isCorrect: boolean): number {
        return this.timeout * (isCorrect ? 1 : 2);
    }

    protected startTimer(): void {
        let startingTime = new Date();

        this.timer = window.setInterval(() => {
            this.timeInSeconds = Math.floor((new Date().getTime() - startingTime.getTime()) / 1000);
        }, 1000);
    }

    protected stopTimer(): void {
        window.clearInterval(this.timer);
    }

    protected resetTimer(): void {
        this.timeInSeconds = 0;
    }

    protected exit(): void {
        alert('Exercise completed!');
    }
}