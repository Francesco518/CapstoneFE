import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/auth/service/movies.service';

@Component({
  selector: 'app-movie-generator',
  templateUrl: './movie-generator.component.html',
  styleUrls: ['./movie-generator.component.scss']
})
export class MovieGeneratorComponent implements OnInit {
  randomMovie: any = {}
  showImage: boolean = false

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
   
  }
  getMovies(): void {
   
    this.moviesService.getRandomMovies().subscribe(
      (response: any) => {
        const movies = response.content;
        if (movies && movies.length > 0) {

          const randomIndex = Math.floor(Math.random() * movies.length);
          this.randomMovie = movies[randomIndex];
        } else {
          console.error("No movies available");
        }
      },
      error => {
        console.error("Error fetching movies", error);
      }
    );
  }
  getRandomMovie(): void {
    this.getMovies()
    this.showImage= true
  }
}
