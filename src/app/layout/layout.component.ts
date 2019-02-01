import { AuthService } from '../model/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService) { }

  isUserLoggedIn(){
     return this.authService.loggedIn;
  }

  ngOnInit() {
  }

}
