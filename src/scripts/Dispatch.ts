import { Type } from '@angular/core';
import { ContentComponent } from '../app/content/content.component'

import { HeaderComponent } from '../app/header/header.component';
import { LessonviewComponent } from '../app/lessonview/lessonview.component';
import { GrammarComponent } from '../app/exercises/grammar/grammar.component';
import { FlashcardsComponent } from '../app/exercises/flashcards/flashcards.component';
import { CreateWordListComponent } from '../app/create-word-list/create-word-list.component';
import { MultipleChoiceComponent } from '../app/exercises/multiplechoice/multiplechoice.component';

export class Dispatch {

    private static func;
    private static instance: Dispatch;

    constructor(
        private _contentComponent: ContentComponent
    ) {}

    public static getInstance(): Dispatch {
        return this.instance;
    }

    public static createInstance(contentComponent: ContentComponent): Dispatch {
        if (this.instance === undefined)
            this.instance = new Dispatch(contentComponent);

        return this.instance;
    }

    public do(href: String): void {
        let component;

        switch (href) {
            case 'header':
                component = HeaderComponent;
                break;
            case 'lessonview':
                component = LessonviewComponent;
                break;
            case 'grammar':
                component = CreateWordListComponent;
                break;
            case 'flashcards':
                component = MultipleChoiceComponent;
                break;
            default:
                console.log('Attempting to load component ' + href + ', but it does not exist.');
                return;
        }

        this._contentComponent.update(component);
    }
}