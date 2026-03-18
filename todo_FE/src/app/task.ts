import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  api = "http://localhost:8080/todo/tasks";

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.api);
  }

  createTask(task:any) {
    return this.http.post(this.api, task);
  }

  markDone(id:number) {
    return this.http.put(this.api + "/" + id + "/done", {});
  }
}
