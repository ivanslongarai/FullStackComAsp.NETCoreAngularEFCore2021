import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {

  title = "Palestrantes";
  constructor() { }

  ngOnInit() {
  }

}
