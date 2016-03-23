import {Directive, HostListener, EventEmitter, Output} from 'angular2/core';

@Directive({
    selector: '[click-to-upload]'
})
export class ClickDirective {
    @Output() onFileSelected: EventEmitter<File> = new EventEmitter();

    /**
     * Emits event if file is added.
     * @param event
     */
    @HostListener('change', ['$event'])
    private onChange(event: any): void {
        event.stopPropagation();
        event.preventDefault();

        let files: File[] = event.target.files;

        if (files.length) {
            this.onFileSelected.emit(files[0]);
        }
    }

}
