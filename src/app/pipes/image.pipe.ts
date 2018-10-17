import { Pipe, PipeTransform } from '@angular/core';
import { SERVICES_URL } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'users'): any {


    let url = SERVICES_URL + '/img';

    if (!img) {
      return url + '/users/no-image-found.jpg';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (type) {
      case 'users':
        url += '/users/' + img;
        break;
      case 'hospitals':
        url += '/hospitals/' + img;
        break;
      case 'doctors':
        url += '/doctors/' + img;
        break;
      default:
        console.log('Wrong image type');
        url += '/users/no-image-found.jpg';
        break;
    }

    return url;
  }

}
