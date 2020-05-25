import { TasksService } from './../../services/tasks.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input('id') id;

  showAddTask;
  bufferInput;
  showEditInputs = [];
  tasks = [];
  previouslySelectedItems = [];

  public searchInput: FormControl = new FormControl();
  public selectMultiSearch: FormControl = new FormControl();

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    
    this.getTask(1);
  }

  getTaskOnEnter(event, taskId) {
    if(event.keyCode == 13) {
      this.getTask(taskId);
    }
  }

  getTask(taskId) {
    console.log(taskId);
    this.tasksService.getTasks(taskId)
      .subscribe(data => {
        this.tasks[0] = data;
        console.log(data);
    }, error => {
      let conformObj = {
        body: {
          title: "???"
        },
        status: error.originalError.status
      }
      this.tasks[0] = conformObj;
      console.log(error);
    });
  }

}
