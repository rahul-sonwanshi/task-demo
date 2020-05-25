import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  getTasks(id) {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/todos/' + id,
    {observe : 'response'});
  }

  deleteTask() {
    // mock delete from backend
  }

  addTask() {
    // mock add to backend
  }

  editTask() {
    // mock edit task backend
  }
}
