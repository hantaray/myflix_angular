/**
 * @fileoverview Movie Card Component for displaying movie details and actions.
 */

import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';

/**
 * @name MovieCardComponent
 * @description Component for rendering and managing movie cards.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  /** @docType property
   * @name movies
   * @description Array of movies fetched from the API.
   */
  movies: any[] = [];

  /** @docType property
   * @name user
   * @description User fetched from the localStorage.
   */
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
    this.getMovies();
  }

  /** @docType method
   * @name getMovies
   * @description Fetch movies and update the component state accordingly.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /** @docType method
   * @name openGenreDialog
   * @description Opens the genre dialog.
   * @param movie The movie for the genre
   */
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '280px',
      data: {
        movie: movie
      }
    });
  }

  /** @docType method
   * @name openDirectorDialog
   * @description Opens the director dialog.
   * @param movie The movie for the director
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '280px',
      data: {
        movie: movie
      }
    });
  }

  /** @docType method
   * @name openSynopsisDialog
   * @description Opens the syniosis dialog.
   * @param movie The movie for the synopsis
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '280px',
      data: {
        movie: movie
      }
    });
  }

  /** @docType method
   * @name addToFavorites
   * @description Adds a movie to the list of favorites by title
   * @param title Title of the movie to add
   */
  addToFavorites(title: any): void {
    this.fetchApiData.addToFavorites(title).subscribe((resp: any) => {
      this.snackBar.open(resp, 'Added to Favorites', {
        duration: 2000
      });
    });
  }
}