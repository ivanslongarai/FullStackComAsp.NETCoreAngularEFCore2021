import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventService } from '../_services/Event.service';
import { Event } from '../_models/Event';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService, } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  filteredEvents: Event[] = [];
  events: Event[] = [];
  event!: Event;
  imageWidth = 32;
  imageMargin = 2;
  showImages = true;
  registerForm!: FormGroup;
  saveMode = "";
  bodyDeleteEvent = "";
  title = "Eventos";

  actualDate = '';
  _filterList = '';

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private LocaleService: BsLocaleService,
  )
  {
    this.LocaleService.use('pt-br');
  }

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

  newEvent(template: any){
    this.openModal(template);
    this.saveMode = "post";
  }

  editEvent(event: Event, template : any){
    this.openModal(template);
    this.saveMode = "put";
    this.event = event;
    this.registerForm.patchValue(this.event);
  }

  deleteEvent(event: Event, template: any) {
    this.openModal(template);
    this.event = event;
    this.bodyDeleteEvent = `Tem certeza que deseja excluir o Evento: ${event.subject}, Código: ${event.id}`;
  }

  confirmDelete(template: any) {
    this.eventService.deleteEvent(this.event.id).subscribe(
      () => {
          template.hide();
          this.getEvents();
          this.toastr.success('Excluído com sucesso');
        }, error => {
          this.toastr.error(`Erro ao excluir: ${error}`);
          console.log(error);
        }
    );
  }

  saveUpdates(template: any) {
    if(this.registerForm.valid)
    {
      if(this.saveMode === "post"){
        this.event = Object.assign({}, this.registerForm.value);
        this.eventService.postEvent(this.event).subscribe(newEvent => {
          console.log(this.event);
              template.hide();
              this.getEvents();
              this.toastr.success('Inserido com sucesso!');
            }, error => {
              this.toastr.error(`Erro ao inserir: ${error}`);
              console.log(error)
            }
        );
      }
      else
      if(this.saveMode === "put"){
        this.event = Object.assign({id: this.event.id}, this.registerForm.value);
        console.log(this.event);
        this.eventService.putEvent(this.event).subscribe(newEvent => {
              template.hide();
              this.getEvents();
              this.toastr.success('Editado com sucesso!');
            }, error => {
              this.toastr.error(`Erro ao editar: ${error}`);
              console.log(error)
            }
        );
      }
    }
  }

  set filterList(filterBy: string) {
    this._filterList = filterBy;
    this.filteredEvents = this._filterList
      ? this.filterEvents(this._filterList)
      : this.events;
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
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
        this.toastr.error(`Erro ao tentar carregar eventos: ${error}`);
      }
    );
  }

  alternateImages() {
    this.showImages = !this.showImages;
  }
}
