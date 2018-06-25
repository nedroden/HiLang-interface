export class LoadingScreen {

    private element: HTMLElement;
    private parent: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'loadingScreen';
        this.element.classList.add('row', 'justify-content-md-center');

        let icon = document.createElement('i');
        icon.classList.add('fa', 'fa-circle-o-notch', 'fa-spin', 'align-self-center');
        icon.setAttribute("style", "font-size: 100px;");
        icon.id = 'load-icon';
        this.element.appendChild(icon);
    }

    public render(parent: HTMLElement): void {
        this.parent = parent;
        this.parent.appendChild(this.element);
    }

    public disable(): void {
        this.parent.removeChild(this.element)
    }
}
