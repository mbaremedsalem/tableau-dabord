import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';






@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://shope-210d872c9dd3.herokuapp.com/api/token/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }
}

