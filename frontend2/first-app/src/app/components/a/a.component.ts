import { Component } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-a',
  imports: [],
  templateUrl: './a.component.html',
  styleUrl: './a.component.css'
})
export class AComponent {
  constructor(public counter: CounterService) {}
}
