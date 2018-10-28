import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVICES_URL } from '../../config/config';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    this.activatedRoute.params.subscribe( params => {
      let term = params['term'];
      this.search(term);
    });
    }

  ngOnInit() {

  }

  search(term: string) {
    let url = SERVICES_URL + '/search/all/' + term;
    this.http.get(url).subscribe((res: any) => {
      this.users = res.users;
      this.hospitals = res.hospitals;
      this.doctors = res.doctors;
      console.log(res);
    });
  }

}
