import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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

  handleAddTask(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = {
      id: Date.now(),
      title: input.value.trim(),
      completed: false,
    }

    if (!newTask.title) {
      return;
    }
    this.tasks.update((tasks) => [...tasks, newTask]);

    input.value = '';
  }

  values = Array.from({ length: 1000 }, (_, i) => i);

  handleDeleteTask(index: number) {
    this.tasks.update((tasks) => tasks.toSpliced(index, 1))
  }

  handleCompleteTask(index: number) {
    this.tasks.update((tasks) => {
      const updatedTask = [...tasks];
      const taskToUpdate = updatedTask[index];

      if (taskToUpdate) {
        taskToUpdate.completed = !taskToUpdate.completed;
      }
      return updatedTask
    })
  }
}
