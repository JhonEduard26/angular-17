import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  person = signal({
    name: 'Jhon',
    age: 24
  })

  colorCtrl = new FormControl('')
  nameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
    ]
  })

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

  handleInputSignal(event: Event) {
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.person.update((obj) => {
      return {
        ...obj,
        name: newValue
      }
    })
  }
}
