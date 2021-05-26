import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  _filterList: string = '';

  get filterList() {
    return this._filterList;
  }

  set filterList(filterBy: string) {
    this._filterList = filterBy;
    this.filteredEvents = this._filterList
      ? this.filterEvents(this._filterList)
      : this.eventos;
  }

  filteredEvents: any = [];

  eventos: any = [];
  imageWidth = 50;
  imageMargin = 2;
  showImages = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEventos();
  }

  filterEvents(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(event =>
      event.subject.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  alternateImages() {
    this.showImages = !this.showImages;
  }

  getEventos() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      (response) => {
        this.eventos = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
