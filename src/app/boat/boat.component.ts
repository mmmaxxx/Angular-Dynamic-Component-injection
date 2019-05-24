import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})
export class BoatComponent implements OnInit {

  passenger = '';
  test = 1234;

  @Input() myInput: string;

  constructor() { }

  ngOnInit() {
  }

}
