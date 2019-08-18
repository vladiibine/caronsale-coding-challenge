import { Component, OnInit } from '@angular/core';
import { AuthenticationFacade } from '@caronsale/authentication';

@Component({
  selector: 'caronsale-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  constructor(private autheticationFacade: AuthenticationFacade) {}

  ngOnInit() {
    // this.autheticationFacade.sendAuthentication({
    //   email: 'salesman@random.com',
    //   password: '123test'
    // });
  }
}
