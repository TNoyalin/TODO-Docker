import { Component, OnInit } from '@angular/core';
import { TaskService } from './task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = "";
  description = "";
  tasks: any[] = [];
  loading = new BehaviorSubject<boolean>(false);

  private startLoading() {
    this.loading.next(true);
  }
  
  private stopLoading() {
    console.log("Stop loading");
    this.loading.next(false);
  }
  constructor(private service: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.startLoading();
    this.service.getTasks()
      .pipe(finalize(() => this.stopLoading()))
      .subscribe({
        next: (data) => this.tasks = data,
        error: (err) => console.error('Error loading tasks', err)
      });
  }

  addTask() {
    if (!this.title || !this.description) return; // optional validation

    this.startLoading();
    const task = {
      title: this.title,
      description: this.description
    };

    this.service.createTask(task)
      .pipe(
        tap(() => {
          this.title = "";
          this.description = "";
        }),
        switchMap(() => this.service.getTasks()),
        finalize(() => this.stopLoading())
      )
      .subscribe({
        next: (data) => this.tasks = data,
        error: (err) => console.error('Error adding task', err)
      });
  }

  done(id: number) {
    this.startLoading();
    this.service.markDone(id)
      .pipe(
        switchMap(() => this.service.getTasks()),
        finalize(() => this.stopLoading())
      )
      .subscribe({
        next: (data) => this.tasks = data,
        error: (err) => console.error('Error marking done', err)
      });
  }

}
