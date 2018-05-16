import { AfterContentInit, Component, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Dispatch } from '../../scripts/Dispatch';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent {

    @ViewChild('container', {read: ViewContainerRef}) container;

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.updateMenuItems(Dispatch.createInstance(this));
    }

    public update(component:any): void {
        setTimeout(() => {
            const cmpFactory = this._componentFactoryResolver.resolveComponentFactory(component);
            this.container.clear();
            this.container.createComponent(cmpFactory);
        });
    }

    public updateMenuItems(dispatch: Dispatch): void {
        document.addEventListener("DOMContentLoaded", function(e) {
            const items = document.getElementsByClassName('nav-item');
            for (let i = 0; i < items.length; i++) {
                let item: HTMLElement = <HTMLElement>items[i];

                item.onclick = function() {
                    let dispatcher = Dispatch.getInstance();
                    dispatcher.do(item.id);
                }
            };
        });
    }
}
