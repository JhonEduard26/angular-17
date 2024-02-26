import { Component, signal } from '@angular/core';
import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';
import { CounterComponent } from '@shared/components/counter/counter.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CounterComponent, WaveAudioComponent, HighlightDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  duration = signal(1000);
  message = signal('About');

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber)
  }

  changeMessage(event: Event) {
    console.log('changeMessage');
    const input = event.target as HTMLInputElement;
    this.message.set(input.value)
  }
}
