import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Progress', url: '/progress' },
        { title: 'Charts', url: '/first-chart' },
        { title: 'Promises', url: '/promises' },
        { title: 'rxjs', url: '/rxjs' }
      ]
    },
    {
      title: 'Management',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Users management', url: '/users'},
        {title: 'Doctors', url: '/doctors'},
        {title: 'Hospitals', url: '/hospitals'}
      ]
    }
  ];

  constructor() { }
}
