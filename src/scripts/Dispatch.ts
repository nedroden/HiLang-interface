import { Type } from '@angular/core';
import { ContentComponent } from '../app/content/content.component'

import { HeaderComponent } from '../app/header/header.component';
import { LessonviewComponent } from '../app/lessonview/lessonview.component';

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
            default:
                component = HeaderComponent;
        }

        this._contentComponent.update(component);
    }
}