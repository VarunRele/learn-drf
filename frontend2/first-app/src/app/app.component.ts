import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { User } from './models/user';
import { JokesComponent } from "./components/jokes/jokes.component";
import { AComponent } from './components/a/a.component';
import { B1Component } from './components/b1/b1.component';

@Component({
  selector: 'app-root',
  imports: [AComponent, B1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-app';
  users = [
    {name: 'Vedant', status: true, salary: 100},
    // {name: 'Adu', status: false, salary: 200},
    // {name: 'Shweta', status: false, salary: 400},
  ]
  salaryUpdate(e: User) {
    const index = this.users.findIndex(user => user.name == e.name)
    this.users[index].salary += 20
  }
}
