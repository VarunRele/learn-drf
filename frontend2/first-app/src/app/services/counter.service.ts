import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private count = signal(0)
  doubleCount: Signal<number> = computed(() => this.count() * 2)

  getCount() {
    return this.count()
  }

  increamentCount() {
    // this.count += 1
    this.count.update(oldValue => oldValue + 1)
  }
}
