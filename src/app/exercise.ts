export abstract class Exercise {
    
    vocabulary;

    queue = [];
    correctWords = [];
    incorrectWords = [];

    public initialize(): void {
        for (let word of vocabulary.sort((a, b) => 0.5 - Math.random()))
            queue.push(word);
    }

    public getNext() {
        return this.queue.length > 0 ? this.queue[0] : null;
    }

    public getProgress(): number {
        return this.correctWords.length / this.vocabulary.length;
    }

    public isCorrect(input: string): boolean {
        return input === this.queue.translation;
    }

    public removeFromQueue(isCorrect: boolean): boolean {
        if (this.queue.length == 0)
            return false;

        (isCorrect ? this.correctWords : this.incorrectWords).push(this.queue[0]);
        this.queue.shift();

        return true;
    }
}