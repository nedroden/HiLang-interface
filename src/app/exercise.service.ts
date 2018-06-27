import { Injectable } from '@angular/core';
import { Flashcard } from './structures/flashcard';
import { Lesson } from './structures/lesson';
import { ExerciseResult } from './structures/exerciseresult';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    private _vocabulary: Flashcard[];
    private _exerciseResult: ExerciseResult;
    private _random: boolean;
    private _capital: boolean;
    private _punctuation: boolean;
    private _tillend: boolean;


    constructor() {
        this.clearResults();
    }

    public clearResults(): void {
        this._exerciseResult = new ExerciseResult;
    }

    public getVocabulary(): Flashcard[] {
        return this._vocabulary;
    }

    public getResults(): ExerciseResult {
        return this._exerciseResult;
    }

    public setVocabulary(vocabulary: Flashcard[]): void {
        this._vocabulary = vocabulary;
    }

    public setLessonTime(timeInSeconds: number): void {
        this._exerciseResult.lessonTime = timeInSeconds;
    }

    public setGrade(grade: number): void {
        this._exerciseResult.grade = grade;
    }

    public setLesson(lesson: Lesson): void {
        this._exerciseResult.lesson = lesson;
    }

    public setExerciseMethod(method: string): void {
        this._exerciseResult.method = method;
    }

    public addCorrectWord(word: Flashcard): void {
        this._exerciseResult.vocabulary.push(word);
    }

    public setRandom(bool: boolean){
        this._random = bool;
    }

    public setCapital(bool: boolean){
        this._capital = bool;
    }

    public setPunctuation(bool: boolean){
        this._punctuation = bool;
    }

    public setTillEnd(bool: boolean){
        this._tillend = bool;
    }

    public getRandom(){
        return this._random;
    }

    public getCapital(){
        return this._capital;
    }

    public getPunctuation(){
        return this._punctuation;
    }

    public getTillEnd(){
        return this._tillend;
    }

}
