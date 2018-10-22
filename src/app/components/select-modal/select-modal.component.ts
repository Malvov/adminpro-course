import { Component, OnInit } from '@angular/core';
import { ModalService, HospitalService, SearchService } from '../../services/service.index';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styles: []
})
export class SelectModalComponent implements OnInit {

  title: string;
  from: number = 1;
  count: number;
  collection: any[] = [];
  loading: boolean = false;
  constructor(
    public _modalService: ModalService,
    public _searchService: SearchService,
    public _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this._modalService.typeToObserve.subscribe((type: string) => {
      this.title = type;
      this.getCollection();
    });
  }

  hideModal() {
    this._modalService.hideModal();
  }

  getCollection() {
    if (this.title === 'hospitals') {
      this._hospitalService.getHospitals(this.from).subscribe((res: any) => {
        this.collection = res.hospitals;
        this.count = res.count;
        return;
      });
    }
  }

  paginate(value: number) {

    let page = this.from + value;

    console.log(page);

    if (page >= this.count) {
      return;
    }

    if (page < 0) {
      return;
    }

    this.from += value;
    this.getCollection();
  }

  searchCollection(term: string) {
    if (term.length <= 0) {
      this.getCollection();
      return;
    }

    this.loading = true;
    if (this.title === 'hospitals') {
      this._searchService.searchHospitals(term).subscribe( (hospitals: any[]) => {
        this.collection = hospitals;
        this.loading = false;
      });
    }
  }

}
