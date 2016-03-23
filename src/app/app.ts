import {Component} from 'angular2/core';
import {PhotoUploadComponent} from './components/photo-upload.component';
import {IPhoto} from './shared/photo';

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.css'],
    directives: [PhotoUploadComponent]
})
export class AppComponent {

    public uploading = false;
    public photo: IPhoto = null;

    constructor() { }

}