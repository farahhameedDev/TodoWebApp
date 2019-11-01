import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

const routes: Routes = [
  {
    path: 'todo',
    component: TodoListComponent,
    data: { title: 'List of Todos' }
  },
  {
    path: 'todo-details/:id',
    component: TodoDetailComponent,
    data: { title: 'Todo Details' }
  },
  {
    path: 'todo-add',
    component: TodoAddComponent,
    data: { title: 'Add Todo' }
  },
  {
    path: 'todo-edit/:id',
    component: TodoEditComponent,
    data: { title: 'Edit Todo' }
  },
  { path: '',
    redirectTo: '/todo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
