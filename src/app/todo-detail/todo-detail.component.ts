import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo = { id: 0, description: '', isCompleted: false };
isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getTodoDetails(this.route.snapshot.params['id']);
  }

  deleteTodo(id) {
    this.isLoadingResults = true;
    this.api.deleteTodo(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/todo']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  getTodoDetails(id) {
    this.api.getTodo(id)
      .subscribe(data => {
        this.todo = data;
        console.log(this.todo);
        this.isLoadingResults = false;
      });
  }

}
