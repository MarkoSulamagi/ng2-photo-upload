import {Directive, HostListener, EventEmitter, Output} from 'angular2/core';

@Directive({
    selector: '[drag-drop-box]'
})
export class DragDropDirective {
    @Output() onFileSelected: EventEmitter<File> = new EventEmitter();

    /**
     * Emit event when file is selected
     * @param e
     */
    @HostListener('drop', ['$event'])
    private onDrop(e: any): void {
        this.preventEvent(e);

        let files: File[] = e.dataTransfer.files;

        if (files.length) {
            this.onFileSelected.emit(files[0]);
        }
    }

    @HostListener('dragenter', ['$event'])
    private onDragEnter(e: any): void {
        this.preventEvent(e);
    }

    @HostListener('dragover', ['$event'])
    private onDragOver(e: any): void {
        this.preventEvent(e);
    }

    private preventEvent(e: any): void {
        e.stopPropagation();
        e.preventDefault();
    }
}
