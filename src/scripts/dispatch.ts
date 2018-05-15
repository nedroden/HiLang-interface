import { Type } from '@angular/core';
import { header } from 'app.header.component';

export function dispatch(component: string): void {

    let name:string ;

    switch (component) {
        case 'header':
            name = HeaderComponent;
    }

    var factories = Array.from(this.resolver['_factories'].keys());
    var factoryClass = <Type<any>>factories.find((x: any) => x.name === name);
    const factory = this.resolver.resolveComponentFactory(factoryClass);
    const compRef = this.vcRef.createComponent(factory);
}