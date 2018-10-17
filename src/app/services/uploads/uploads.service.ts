import { Injectable } from '@angular/core';
import { SERVICES_URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor() { }

  uploadFile(file: File, type: string, id: string) {

    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('image', file, file.name);
      xhr.onreadystatechange = function() {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('file uploaded');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('something went wrong with uploading file');
            reject(xhr.response);
          }
        }
      };

      let url = SERVICES_URL + '/upload/' + type + '/' + id;

      xhr.open('POST', url, true);
      xhr.send(formData);
    });


  }
}
