import {Injectable} from 'angular2/core';
import {Http, Response, RequestOptionsArgs, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {IPhoto} from './photo';
import {UPLOAD_URL, ALLOWED_MIME_TYPES} from '../../config';

@Injectable()
export class PhotoUploadService {

    constructor(private _http: Http) { }

    /**
     * Upload photo or throw error instead.
     * @param file HTML File object
     * @returns {Observable<Response>}
     */
    public uploadPhoto(file: File): Observable<Response> {
        let observer: Observable<Response> = Observable.create(observer => {

            let formData = new FormData();
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let self = this;

            xhr.onload = function() {
                if (this.status === 201) {
                    let response: any = JSON.parse(this.response);

                    if (response.status === 'CREATED') {
                        let photo: IPhoto = self.parseResponse(response.result);
                        observer.next(photo);
                    } else {
                        observer.error('Error uploading file');
                    }
                }
                observer.complete();
            };

            formData.append('file', file, file.name);
            xhr.open('POST', UPLOAD_URL, true);
            xhr.send(formData);
            observer.next({ uploading: true });
        });

        return observer;

        // TODO: Change XmlHttpRequest to http service as soon as https://github.com/angular/http/issues/75 is resolved.
        // return this._http.post(url, formData, options)
        //     .map(data => data.json());
    }

    /**
     * @param type
     * @returns {boolean}
     */
    public hasValidFileTypeValid(type: string): boolean {
        return (ALLOWED_MIME_TYPES.indexOf(type.toLowerCase()) !== -1);
    }

    /**
     * Parse API response and create Photo object
     * @param data
     * @returns {IPhoto}
     */
    private parseResponse(data: any): IPhoto {
        let photo: IPhoto;

        photo = {
            photo_id: data.photo_id,
            file_name: data.file_name,
            file_url: data.files.cropped
        };

        return photo;
    }
}
