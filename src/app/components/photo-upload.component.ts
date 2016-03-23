import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {DragDropDirective} from '../directives/drag-drop.directive';
import {ClickDirective} from '../directives/click.directive';
import {PhotoUploadService} from '../shared/photo-upload.service';
import {IPhoto} from '../shared/photo';

@Component({
    selector: 'photo-upload',
    templateUrl: '/app/components/photo-upload.html',
    styleUrls: ['app/components/photo-upload.css'],
    directives: [DragDropDirective, ClickDirective],
    providers: [PhotoUploadService]
})
export class PhotoUploadComponent {
    @Input() uploading: boolean;
    @Input() photo: IPhoto;

    @Output() uploadingChange: EventEmitter<boolean> = new EventEmitter();
    @Output() photoChange: EventEmitter<IPhoto> = new EventEmitter();

    constructor(private _photoUploadService: PhotoUploadService) { }

    /**
     * Event that is called when user has selected file.
     * @param file
     * @returns {boolean}
     */
    public onFileSelected(file: File) {
        if (!this._photoUploadService.hasValidFileTypeValid(file.type)) {
            alert('Only photo files are allowed');
            return false;
        }

        this.upload(file);
    }

    public removePhoto(): void {
        this.photo = null;
        this.photoChange.emit(this.photo);
    }

    private setUploadingStarted() {
        this.uploading = true;
        this.uploadingChange.emit(this.uploading);
    }

    private setUploadingStopped() {
        this.uploading = false;
        this.uploadingChange.emit(this.uploading);
    }

    private upload(file: File) {
        this._photoUploadService.uploadPhoto(file).subscribe((data: any) => {
            if (data.uploading) {
                this.setUploadingStarted();
            } else {
                this.photo = data;
                this.photoChange.emit(this.photo);
            }
        }, (error) => {
            alert('Error uploading file: ' + JSON.stringify(error));
            this.setUploadingStopped();
        }, () => {
            this.setUploadingStopped();
        });
    }

}
