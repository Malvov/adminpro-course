import { Injectable } from '@angular/core';
import { SERVICES_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    public http: HttpClient
  ) { }

  searchUsers(term: string) {
    let url = SERVICES_URL + '/search/collection/users/' + term;
    return this.http.get(url).map( (res: any) => res.users );
   }

   searchHospitals(term: string) {
    let url = SERVICES_URL + '/search/collection/hospitals/' + term;
    return this.http.get(url).map( (res: any) => res.hospitals);
  }

  searchDoctors(term: string) {
    let url = SERVICES_URL + '/search/collection/doctors/' + term;
    return this.http.get(url).map((res: any) => res.doctors);
  }
}
