import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent {
  genres: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getGenre();
  }

  getGenre(): void {
    this.fetchApiData.getGenre("Oldboy").subscribe((resp: any) => {
      this.genres = resp;
      console.log(this.genres);
      return this.genres;
    });
  }
}
