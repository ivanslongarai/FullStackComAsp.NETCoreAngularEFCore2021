import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventService } from '../_services/Event.service';
import { Event } from '../_models/Event';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  filteredEvents: Event[] = [];
  events: Event[] = [];
  imageWidth = 50;
  imageMargin = 2;
  showImages = false;
  modalRef!: BsModalRef;
  registerForm!: FormGroup;

  actualDate = '';
  _filterList = '';

  constructor(
    private eventService: EventService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  get filterList() {
    return this._filterList;
  }

  validation() {
    this.registerForm = new FormGroup({
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]),
      local: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(120000),
      ]),
      phone: new FormControl('', Validators.required),

      email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

      imageUrl: new FormControl('', Validators.required),
    });
  }

  saveUpdates() {}

  set filterList(filterBy: string) {
    this._filterList = filterBy;
    this.filteredEvents = this._filterList
      ? this.filterEvents(this._filterList)
      : this.events;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  filterEvents(filterBy: string): Event[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.events.filter(
      (event: Event) =>
        event.subject.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnInit() {
    this.validation();
    this.getEvents();
  }

  getEvents() {
    this.actualDate = new Date().getMilliseconds().toString();
    this.eventService.getAllEvents().subscribe(
      (_eventos: Event[]) => {
        this.events = _eventos;
        this.filteredEvents = this.events;
        console.log(this.events);
      },
      (error) => {
        this.toastr.error(`Erro ao tentar Carregar eventos: ${error}`);
      }
    );
  }

  alternateImages() {
    this.showImages = !this.showImages;
  }
}
