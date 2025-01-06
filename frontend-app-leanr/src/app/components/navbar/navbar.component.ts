import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';
import { LoggedInService } from '../../services/logged-in.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public loggedIn: LoggedInService, public api: RestApiService, private router: Router) {}
  logout() {
    this.api.logout()
    this.router.navigate(['/login'])
  }
}
