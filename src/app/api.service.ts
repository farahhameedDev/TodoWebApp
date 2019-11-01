import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Todo } from './todo';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:56006/api/todo";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTodos (): Observable<Todo[]> {
    return this.http.get<Todo[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched Todos')),
        catchError(this.handleError('getTodos', []))
      );
  }
  
  getTodo(id: number): Observable<Todo> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => console.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }
  
  addTodo (todo): Observable<Todo> {
    return this.http.post<Todo>(apiUrl, todo, httpOptions).pipe(
      tap((todo: Todo) => console.log(`added Todo w/ id=${todo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }
  
  updateTodo (id, todo): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, todo, httpOptions).pipe(
      tap(_ => console.log(`updated todo id=${id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }
  
  deleteTodo (id): Observable<Todo> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Todo>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }
}
