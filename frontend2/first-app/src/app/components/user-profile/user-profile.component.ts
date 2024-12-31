import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { CountryCodePipe } from '../../pipes/country-code.pipe';
import { HighlightDirective } from '../../directive/highlight.directive';

function UpdateName(value: string){
  return "Hi " + value
}

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule, CommonModule, CountryCodePipe, HighlightDirective],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  // name = 'varun'
  // salary = 40000
  isDisabled = false
  inputVal = 'test'
  phoneno = 243434
  bgColor = "blue"

  @Input({alias:"userName"}) name = ""
  @Input() salary = 0
  @Input() status = false
  @Output() updateSalary = new EventEmitter<User>()


  update(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.inputVal = value
  }

  salaryUpdate() {
    this.updateSalary.emit({name: this.name, salary: this.salary, status: this.status})
  }
}
