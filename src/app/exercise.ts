import { Flashcard } from './structures/flashcard';
import { ExerciseService } from './exercise.service';
import { Router } from '@angular/router';
import { Lesson } from './structures/lesson';
import { CookieService } from './cookie.service';
import { HilangApiService } from './hilang-api.service';

export abstract class Exercise {

    protected timeout = 1000;

    protected score: number = 0;

    protected vocabulary: Flashcard[];

    protected queue: Flashcard[];
    protected correctWords: Flashcard[];
    protected incorrectWords: Flashcard[];
    protected allWords: Flashcard[];

    protected currentWord: Flashcard;

    protected progress: number;

    protected timeInSeconds: number;
    protected timer: number;

    protected round: number;

    protected mcOptions;

    constructor(protected exerciseService: ExerciseService,
                protected router: Router,
                private _api: HilangApiService,
                private _cookie: CookieService) {
        console.log('1');
        this.exerciseService.setVocabulary([]);
        this.exerciseService.clearResults();

        this.queue = [];
        this.correctWords = [];
        this.incorrectWords = [];
        this.allWords = [];

        this.currentWord = new Flashcard;
        this.progress = 0;

        this.timeInSeconds = 0;
        this.round = 0;
    }

    protected initialize(lesson: Lesson): void {
        this.initQueue();
        this.allWords = this.queue.slice(0);
        this.setCurrentWord();
        //this.addOptions(this.currentWord);
        this.startTimer();
        this.exerciseService.setLesson(lesson);
        this._api.call('/update_activity/', {course_id : lesson['course_id']}).subscribe();
    }

    protected initQueue(){
        console.log('3');
        //Punctuation unchecked, capital unchecked
        this.switchVocabulary();
        if(!this.exerciseService.getPunctuation() && !this.exerciseService.getCapital()){
            if(this.exerciseService.getRandom()){
                for (let word of this.exerciseService.getVocabulary().sort((a, b) => 0.5 - Math.random())){
                    word.native = this.removeAccents(word.native).toLowerCase();
                    word.translation = this.removeAccents(word.translation).toLowerCase();
                    this.queue.push(word);
                }
            } else {
                for (let word of this.exerciseService.getVocabulary()){
                    word.native = this.removeAccents(word.native).toLowerCase();
                    word.translation = this.removeAccents(word.translation).toLowerCase();
                    this.queue.push(word);
                }
            }
        }
        //Punctuation unchecked, capital checked
        else if(!this.exerciseService.getPunctuation() && this.exerciseService.getCapital()){
            if(this.exerciseService.getRandom()){
                for (let word of this.exerciseService.getVocabulary().sort((a, b) => 0.5 - Math.random())){
                    word.native = this.removeAccents(word.native);
                    word.translation = this.removeAccents(word.translation);
                    this.queue.push(word);
                }
            } else {
                for (let word of this.exerciseService.getVocabulary()){
                    word.native = this.removeAccents(word.native);
                    word.translation = this.removeAccents(word.translation);
                    this.queue.push(word);
                }
            }
        }
        //Punctuation checked, capital unchecked
        else if(this.exerciseService.getPunctuation() && !this.exerciseService.getCapital()){
            if(this.exerciseService.getRandom()){
                for (let word of this.exerciseService.getVocabulary().sort((a, b) => 0.5 - Math.random())){
                    word.native = word.native.toLowerCase();
                    word.translation = word.translation.toLowerCase();
                    this.queue.push(word);
                }
            } else {
                for (let word of this.exerciseService.getVocabulary()){
                    word.native = word.native.toLowerCase();
                    word.translation = word.translation.toLowerCase();
                    this.queue.push(word);
                }
            }
        }
        //Punctuation checked, capital checked
        else {
            if(this.exerciseService.getRandom()){
                for (let word of this.exerciseService.getVocabulary().sort((a, b) => 0.5 - Math.random())){
                    this.queue.push(word);
                }
            } else {
                for (let word of this.exerciseService.getVocabulary()){
                    this.queue.push(word);
                }

            }
        }
        if(this.exerciseService.getSwitch()) {
            this.switchVocabulary();
        }
    }

    switchVocabulary() {
        for(let word of this.queue) {
            let holder = word.native;
            word.native = word.translation;
            word.translation = holder;
        }
    }

    protected setCurrentWord(){
        this.currentWord = this.queue[0];
    }

    protected hasNext(): boolean {
        return this.queue.length !== 0;
    }

    protected next(): void {
        if (this.hasNext()){
            this.setCurrentWord();
            this.addOptions(this.currentWord)
        } else if (this.incorrectWords.length > 0)
            this.nextRound();
        else
            this.exit();
    }

    private updateProgress(): void {
        this.progress = (this.correctWords.length / this.exerciseService.getVocabulary().length) * 100;
    }

    protected isCorrect(input: string): boolean {
        return input === this.queue[0].translation;
    }

    protected getCorrectValue(){
        return this.currentWord.translation;
    }

    protected clear(isCorrect: boolean, input: HTMLInputElement): boolean {
        if (!this.hasNext())
            return false;

        if (isCorrect) {
            this.currentWord.roundCorrect = this.round;
            this.exerciseService.addCorrectWord(this.currentWord);
        }

        (isCorrect ? this.correctWords : this.incorrectWords).push(this.queue[0]);
        this.queue.shift();

        this.updateProgress();

        if (input !== null)
            input.value = '';

        return true;
    }

    protected nextRound(): void {
        this.queue = this.incorrectWords.slice().sort((a, b) => 0.5 - Math.random());
        this.incorrectWords = [];

        if (this.queue.length > 0)
            this.next();

        this.round++;
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

    protected calculateGrade(): void {
        let correctInFirstAttempt = 0;
        let pointsPerWord = 9 / this.exerciseService.getVocabulary().length;

        for (let word of this.exerciseService.getResults().vocabulary)
            if (word.roundCorrect === 0)
                correctInFirstAttempt++;

        this.exerciseService.setGrade(1 + pointsPerWord * correctInFirstAttempt);
    }

    protected exit(): void {
        this.calculateGrade();
        this.exerciseService.setLessonTime(this.timeInSeconds);
        this.exerciseService.setExerciseMethod('Flashcards');

        this.stopTimer();
        this.router.navigate(['/user/exercisecompleted']);
    }

    protected addOptions(word: Flashcard){
        var options = [this.queue[0]];
        let rand = this.allWords.slice(0).sort((a, b) => 0.5 - Math.random());
        let index = rand.indexOf(this.queue[0]);
        if (index !== -1) rand.splice(index, 1);
        if (rand.length > 3) rand.splice(3, rand.length - 3);
        options = options.concat(rand);
        for (let i in options) {
            options[i] = options[i].translation;
        }
        word.options = options.sort((a, b) => 0.5 - Math.random());
    }

    protected removeAccents(input): string {
        var strAccents = input.split('');
        var strAccentsOut = new Array();
        var strAccentsLen = strAccents.length;
        var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
        var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
        for (var y = 0; y < strAccentsLen; y++) {
            if (accents.indexOf(strAccents[y]) != -1) {
                strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
            } else
                strAccentsOut[y] = strAccents[y];
        }
        let output = strAccentsOut.join('');
        return output
    }
}
