import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl = 'http://localhost:4201/movies'

  constructor(private http: HttpClient) { }

  getMovies(page: number, size: number): Observable<any> {
    const token = localStorage.getItem('user')
    let headers = new HttpHeaders()
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`)
      console.log(tokenParsed)
    }
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`, {
      headers,
    }) 
  }
  getMovieById(movieId: string): Observable<any> {
    const token = localStorage.getItem('user')
    let headers = new HttpHeaders()
    if (token) { 
      const tokenParsed = JSON.parse(token).accessToken
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`)
      console.log(tokenParsed)
    }
    return this.http.get(`${this.baseUrl}/${movieId}`, {headers}).pipe(
      tap((movie: any) => console.log('Movie details:', movie)),
      catchError(error => {
        console.error('Error getting', error)
        throw error
      })
    )
  }
  filterMoviesByCategory(category: string, page: number, size: number, order: string): Observable<any> {
    const token = localStorage.getItem('user')
    let headers = new HttpHeaders()
    let params = new HttpParams().set('category', category).set('page', page.toString()).set('size', size.toString()).set('order', order)
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`)
    }
    return this.http.get(`${this.baseUrl}/filter`, {
      headers,
      params
    })
  }
  getRandomMovies(page: number = 0, size: number = 200): Observable<any> {
    const token = localStorage.getItem('user')
    let headers = new HttpHeaders()
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`)
      console.log(tokenParsed)
    }
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`, {
      headers,
    }) 
  }
}
