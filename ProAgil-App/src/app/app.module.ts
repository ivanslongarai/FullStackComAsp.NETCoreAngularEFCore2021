//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Services
import { EventService } from './_services/Event.service';

//Components
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { NavComponent } from './nav/nav.component';

//Locale
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

//Pipes
import { DateTimeFormatPipePipe } from './_helpers/DateTimeFormatPipe.pipe';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    NavComponent,
    DateTimeFormatPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: true
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
