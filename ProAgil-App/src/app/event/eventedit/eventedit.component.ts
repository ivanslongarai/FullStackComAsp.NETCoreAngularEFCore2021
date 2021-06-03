import { EventService } from 'src/app/_services/Event.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/_models/Event';


@Component({
  selector: 'app-eventedit',
  templateUrl: './eventedit.component.html',
  styleUrls: ['./eventedit.component.css']
})

export class EventEditComponent implements OnInit {

  title = 'Editar Evento';
  event : Event = new Event();
  imageUrl = 'assets/img/upload.png';
  registerForm!: FormGroup;
  file!: File;
  fileNameToUpdate!: string;
  actualDate = '';

  constructor(
    private eventService: EventService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
    , private toastr: ToastrService
    , private router: ActivatedRoute
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [],
      subject: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      date: ['', Validators.required],
      imageUrl: [''],
      amount: ['', [Validators.required, Validators.max(120000)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lots: this.fb.array([]),
      socialNetworks: this.fb.array([])
    });
  }

  onChangeFile(event: any, file: FileList) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.imageUrl = event.target.result;
    this.file = event.target.files;
    reader.readAsDataURL(file[0]);
  }

}
