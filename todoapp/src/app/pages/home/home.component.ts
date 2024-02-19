import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Aprender Angular',
      completed: false,
    },
    {
      id: Date.now() + 1,
      title: 'Aprender TypeScript',
      completed: true,
    },
    {
      id: Date.now() + 2,
      title: 'Aprender Firebase',
      completed: false,
    },
  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^\S+(\s\S+)*$/),
      Validators.minLength(3),
    ]
  })

  onChange() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value;
      this.onAdd(value);
      this.newTaskCtrl.setValue('');
    }
  }

  onAdd(value: string) {
    const newTask = {
      id: Date.now(),
      title: value,
      completed: false,
    }

    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  onUpdate(index: number, event: Event) {
    const input = event.target as HTMLInputElement;

    this.tasks.update((tasks) => {
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }

        return task;
      })
    })
  }

  onEdit(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            editing: true
          }
        }

        return {
          ...task,
          editing: false
        }
      })
    })
  }

  onDelete(index: number) {
    this.tasks.update((tasks) => tasks.toSpliced(index, 1));
  }

  handleCompleteTask(index: number) {
    this.tasks.update((tasks) => {
      const updatedTask = [...tasks];
      const taskToUpdate = updatedTask[index];

      if (taskToUpdate) {
        taskToUpdate.completed = !taskToUpdate.completed;
      }
      return updatedTask;
    })
  }
}
