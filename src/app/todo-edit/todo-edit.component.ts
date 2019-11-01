import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  todoForm: FormGroup;
  id : number = 0;
  description:string='';
  isCompleted: boolean=false;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getTodo(this.route.snapshot.params['id']);
    this.todoForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'isCompleted' : [false]
    });
  }

  getTodo(id) {
    this.api.getTodo(id).subscribe(data => {
      this.id = data.id;
      this.todoForm.setValue({
        description: data.description,
        isCompleted: data.isCompleted
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.updateTodo(this.id, form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/todo']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  todoDetails() {
    this.router.navigate(['/todo-details', this.id]);
  }

}
