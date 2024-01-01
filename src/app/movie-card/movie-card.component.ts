import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favoriteMovieIds: any = [];
  user: any = [];
  public small: boolean = false;
  public medium: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public matIconModule: MatIconModule,
    public breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      '(max-width: 599px)'
    ]).subscribe(result => {
      this.small = result.matches;
    });

    breakpointObserver.observe([
      '(max-width: 1099px)'
    ]).subscribe(result => {
      this.medium = result.matches;
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.movies = this.getMovies();
    this.favoriteMovies = this.getFavoriteMovies()
  }

  getMovies(): any {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getFavoriteMovies(): any {
    this.fetchApiData.getFavoriteMovies(JSON.parse(this.user).username).subscribe((resp: [string]) => {
      resp.forEach(id => {
        this.favoriteMovieIds.push(id);
      });
      this.favoriteMovies = this.movies.filter(m => this.favoriteMovieIds.includes(m._id))
    });
  }

  isFavorite(movie: any): boolean {
    if (this.favoriteMovieIds.includes(movie._id)) {
      return true;
    } else {
      return false;
    }
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '280px',
      data: {
        movie: movie
      }
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '280px',
      data: {
        movie: movie
      }
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '280px',
      data: {
        movie: movie
      }
    });
  }

  addRemoveFavorites(movie: any): void {
    // Check if the movie is already in favorites
    const isAlreadyFavorite = this.favoriteMovieIds.includes(movie._id);

    if (isAlreadyFavorite) {
      // If it's already in favorites, remove it
      this.fetchApiData.deleteFromFavorites(movie.title).subscribe((resp: any) => {
        const index = this.favoriteMovieIds.indexOf(movie._id);
        if (index !== -1) {
          this.favoriteMovieIds.splice(index, 1);
        }

        const movieIndex = this.favoriteMovies.findIndex(m => m._id === movie._id);
        if (movieIndex !== -1) {
          this.favoriteMovies.splice(movieIndex, 1);
        }

        this.snackBar.open(resp, 'Removed from Favorites', {
          duration: 2000
        });
      });
    } else {
      // If it's not in favorites, add it
      this.fetchApiData.addToFavorites(movie.title).subscribe((resp: any) => {
        this.favoriteMovieIds.push(movie._id);
        this.favoriteMovies.push(movie);

        this.snackBar.open(resp, 'Added to Favorites', {
          duration: 2000
        });
      });
    }
  }
}