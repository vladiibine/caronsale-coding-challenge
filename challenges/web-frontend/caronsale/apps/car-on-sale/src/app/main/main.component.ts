import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'caronsale-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('main');
  }
}
