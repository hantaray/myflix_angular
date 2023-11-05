import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent {
  userOld: any = [];
  user: any = [];
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favoriteMovieIds: any = [];
  public small: boolean = false;
  public medium: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
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
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  ngOnInit(): void {
    this.userOld = localStorage.getItem('user');
    if (this.userOld) {
      this.userOld = JSON.parse(this.userOld);
      this.userData = {
        username: this.userOld.username, password: this.userOld.password, email: this.userOld.email,
        birthday: this.userOld.birthday
      };
    }
    this.getMovies();
  }

  updateUser(): void {
    this.fetchApiData.updateUser(this.userOld.username, this.userData).subscribe((resp: any) => {
      this.snackBar.open(resp, 'Update succesful', {
        duration: 2000
      });
      localStorage.setItem('user', JSON.stringify(this.userData));
    });
    this.userOld = localStorage.getItem('user');
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.getFavoriteMovies();
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies(this.userOld.username).subscribe((resp: [string]) => {
      resp.forEach(id => {
        this.favoriteMovieIds.push(id);
      });
      this.favoriteMovies = this.movies.filter(m => this.favoriteMovieIds.includes(m._id))
    });
  }

  removeFromFavorites(title: any): void {
    this.fetchApiData.deleteFromFavorites(title).subscribe((resp: any) => {
      this.snackBar.open(resp, 'Removed from Favorites', {
        duration: 2000
      });
    });
  }
}
