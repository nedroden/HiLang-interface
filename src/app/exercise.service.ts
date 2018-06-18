import { Injectable } from '@angular/core';
import { Flashcard } from './structures/flashcard';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    private _vocabulary: Flashcard[];

    constructor() { }

    public getVocabulary(): Flashcard[] {
        return this._vocabulary;
    }

    public setVocabulary(vocabulary: Flashcard[]): void {
        this._vocabulary = vocabulary;
    }
}
