import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  baseUrl = 'http://localhost:4201/quizzes'

  constructor(private http: HttpClient) { }

  getQuizzes(page: number, size: number): Observable<any> {
    const token = localStorage.getItem('user')
    let headers = new HttpHeaders()
    if(token) {
      const tokenParsed = JSON.parse(token).accessToken
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`)
      console.log(tokenParsed)
    }
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`, { headers, })
  }
}
