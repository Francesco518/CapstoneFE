import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/auth/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  page: number = 0
  size: number = 12
  totalPages: number =  1
  movies: any[] = []
  totalElements: number = 0
  response: any[] = []
  categoryFilter: string = ''

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    this.getMovies()
    this.activatedRoute.paramMap.subscribe((params) => {
      const movieId = params.get('movieId')
      if(movieId) {
        this.getMovieById(movieId)
      } else {
        this.getMovies()
      }
    })
  }
  getMovies(): void {
    this.moviesService.getMovies(this.page, this.size).subscribe(
      (response: any) => {
        this.movies = response.content
        this.totalElements = response.totalElements
        this.totalPages = response.totalPages
      }
    )
  }
  getMovieById(movieId: string): void {
    this.moviesService.getMovieById(movieId).subscribe((response: any) => {
      this.response = [response]
    })
  }
  loadNextPage():void {
    if(this.page < this.totalPages - 1) {
      this.page++
      this.getMovies()
    }
  }
  loadPreviousPage(): void {
    if (this.page > 0) {
      this.page--
      this.getMovies()
    }
  }
  applyCategoryFilter(): void {
    this.page = 0;
    this.moviesService.filterMoviesByCategory(this.categoryFilter, this.page, this.size, 'id').subscribe(
      (response: any) => {
        this.movies = response.content;
        this.totalElements = response.totalElements
        this.totalPages = response.totalPages
      }
    )
  }
}
