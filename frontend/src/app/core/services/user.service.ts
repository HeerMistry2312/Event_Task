import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }
  url: string = 'http://localhost:3000/user'

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/signup`, data).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }

  login(username: string, password: string): Observable<any> {
    const data = { username: username, password: password }
    return this.http.post<any>(`${this.url}/login`, data).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.url}/logout`)
      .pipe(catchError((err: HttpErrorResponse) => {
        return this.errorService.handleError(err)
      }))
  }
  getUser(): Observable<any> {
    return this.http.get<any>(`${this.url}/profile`).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }
  updateUser(data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updateUser`, data).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }

  createEvent(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/create`, data).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }

  updateEvent(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/update/${id}`, data).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/delete/${id}`).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }

  getAllEvent(): Observable<any> {
    return this.http.get<any>(`${this.url}/all`).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }

  getEvent(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }

  RegisterForEVent(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/register/${id}`).pipe(catchError((err: HttpErrorResponse) => {
      return this.errorService.handleError(err)
    }))
  }

}
