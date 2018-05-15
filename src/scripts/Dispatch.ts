import { Type } from '@angular/core';
import { ContentComponent } from '../app/content/content.component'

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

    public do(component: String):void {
        this._contentComponent.update(component);
    }
}