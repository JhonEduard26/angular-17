import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  tasks = [
    'Instalar angular cli',
    'Crear primer componente',
    'Crear el build de la app',
  ]
  name = signal('Jhon')
  age = 24
  disabled = false
  urlImg = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'

  anotherTasks = signal([
    'Instalar angular cli',
    'Crear primer componente',
    'Crear el build de la app',
  ])

  handleClick() {
    console.log('Click')
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement
    console.log('Change', input.value)
  }

  handleKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.name.set(newValue)
  }
}
