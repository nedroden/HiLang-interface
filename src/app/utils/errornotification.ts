export class ErrorNotification {

    private _timeout: number;
    
    constructor(private _message: string, private _elementId: string, private _type: string) {
        this._timeout = 0;
    }

    public render(): void {
        let error_box = document.getElementById(this._elementId);

        error_box.classList.add('alert', 'alert-' + this._type);
        error_box.innerHTML = this._message;

        setTimeout(() => {
            error_box.innerHTML = '';
            error_box.classList.remove('alert', 'alert-' + this._type);
        }, this._timeout);
    }

    public getTimeout(): number {
        return this._timeout;
    }

    public setTimeout(timeout: number): void {
        this._timeout = timeout;
    }
}