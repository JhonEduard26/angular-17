import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = "";
  counter = signal(0)
  counterRef: number | undefined

  constructor() {
    // No async
    // before render
    console.log('CounterComponent constructor');
    console.log('-'.repeat(12));
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during render
    console.log('CounterComponent ngOnChanges');
    console.log('-'.repeat(12));
    console.log(changes);
  }

  ngOnInit() {
    // before render
    // exa: for api calls
    console.log('CounterComponent ngOnInit');
    console.log('-'.repeat(12));

    this.counterRef = window.setInterval(() => {
      console.log('interval: ');
      this.counter.update(prev => prev + 1);
    }, 1000)
  }

  ngAfterViewInit() {
    // after render
    // after child component render
    console.log('CounterComponent ngAfterViewInit');
    console.log('-'.repeat(12));
  }

  ngOnDestroy() {
    // before destroy
    console.log('CounterComponent ngOnDestroy');
    console.log('-'.repeat(12));
    window.clearInterval(this.counterRef)
  }
}
