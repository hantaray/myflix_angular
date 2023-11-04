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

  goToPage(title: any): void {
    this.router.navigate([title]);
  }
}