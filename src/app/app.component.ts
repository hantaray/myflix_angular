import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular';
  constructor(
    private router: Router
  ) { }

  /** @docType method
   * @name goToPage
   * @description Changes the page by title.
   * @param title Title of the page
   */
  goToPage(title: any): void {
    this.router.navigate([title]);
  }

  /** @docType method
   * @name logout
   * @description Logs out the current user
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}