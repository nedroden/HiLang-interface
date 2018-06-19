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
}
