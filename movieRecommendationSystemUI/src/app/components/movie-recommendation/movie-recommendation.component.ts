import { Component, OnInit } from '@angular/core';
import { RecommedService } from 'src/app/services/recommed.service';

@Component({
  selector: 'app-movie-recommendation',
  templateUrl: './movie-recommendation.component.html',
  styleUrls: ['./movie-recommendation.component.css']
})
export class MovieRecommendationComponent implements OnInit {
  constructor(private service: RecommedService) { }
  recommendedMovies: any = []
  searched: boolean = false
  movieName: string = 'Batman'
  movieList = [
    'The Ring',
    'Batman',
    'Iron Man',
    'Avenger'
  ]
  displayedMovies: any = []
  getAllMovies() {
    this.service.getAllMovie().subscribe((data) => {
      this.movieList = data
    })
  }

  ngOnInit(): void {
    this.service.getAllRecommendation(this.movieName).subscribe((data) => {
      this.recommendedMovies = data
    }, (error) => {
      console.log(error)
    })
    this.service.getAllMovie().subscribe((data) => {
      this.movieList = data
      this.displayedMovies = this.movieList.slice(0, 7);
    })

  }
  updateMovieName(movieName: string) {
    this.movieName = movieName
  }
  filterMovies(searchTerm: string): void {
    this.getAllMovies()
    this.displayedMovies = this.movieList.filter(movie => movie.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 7);
    this.searched = true
  }
  getRecommendation() {
    this.service.getAllRecommendation(this.movieName).subscribe((data) => {
      this.recommendedMovies = data
      this.displayedMovies = []
    }, (error) => {
      console.log(error)
    })
  }

}
