import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild('wave') wave!: ElementRef;
  private waveRef!: WaveSurfer;
  isPlay = false;

  ngAfterViewInit() {
    this.waveRef = WaveSurfer.create({
      url: this.audioUrl,
      container: this.wave.nativeElement,
    });
  }

  playPause() {
    this.waveRef.playPause();
    this.isPlay = !this.isPlay;
  }
}
