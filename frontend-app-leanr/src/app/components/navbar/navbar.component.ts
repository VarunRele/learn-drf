import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';
import { LoggedInService } from '../../services/logged-in.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public loggedIn: LoggedInService) {}
}
