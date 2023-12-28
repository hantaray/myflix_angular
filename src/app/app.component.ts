import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myFlix-Angular';
  constructor(
    private router: Router
  ) { }

  goToPage(title: any): void {
    this.router.navigate([title]);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  loggedInUser(): boolean {
    if (localStorage.getItem('user'))
      return true;
    else
      return false;
  }
}