import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/auth/service/movies.service';

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.scss']
})
export class SingleFilmComponent implements OnInit {
  movie: any

  constructor(private route: ActivatedRoute, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.getMovieDetails()
  }
  getMovieDetails(): void {
    const id = this.route.snapshot.paramMap.get('movieId')
    if(id !==  null) {
      this.movieService.getMovieById(id).subscribe(
        (movie: any) => {
          console.log('Movie', movie)
          if (movie) {
            this.movie = movie
          } else {
            console.log('Movie not found')
          }
        }
      ),
      (error: any) => {
        console.error("ERROR", error)
      }
    }
  }
}
