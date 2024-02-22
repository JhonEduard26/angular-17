import { Component, computed, effect, signal } from '@angular/core';
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
  tasks = signal<Task[]>([]);

  filter = signal('all');

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^\S+(\s\S+)*$/),
      Validators.minLength(3),
    ]
  })

  constructor() {
    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()))
    })
  }

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      this.tasks.set(JSON.parse(storage))
    }
  }

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

  onFilterChange(filter: string) {
    this.filter.set(filter);
  }
}
