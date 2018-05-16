import { AfterContentInit, Component, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
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

    update(component:any) {
        setTimeout(() => {
            const cmpFactory = this._componentFactoryResolver.resolveComponentFactory(HeaderComponent);
            this.container.clear();
            this.container.createComponent(cmpFactory);
        });
    }

    updateMenuItems(dispatch: Dispatch) {
        document.addEventListener("DOMContentLoaded", function(e) {
            const items = document.getElementsByClassName('nav-item');
            Array.from(items).forEach((item) => item.onclick = function() {
                let dispatcher = Dispatch.getInstance();
                dispatcher.do(item.id);
            });
        });
    }
}
