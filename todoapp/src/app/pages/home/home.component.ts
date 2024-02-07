import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal([
    'Instalar angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio',
    'Aprender Javascript',
  ])
}
