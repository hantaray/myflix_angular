import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @name GenreDialogComponent
 * @description Component for rendering genre dialog.
 */
@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent {
  genre: any[] = [];

  /**
   * Constructs the dialog component.
   * @param data Data passed to the dialog.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /** 
   * @name ngOnInit
   * @description Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
    console.log(this.data)
    this.getGenre(this.data.movie.genres[0].name);
  }

  /**
   * Gets the genre by name.
   * @param name Genre name.
   */
  getGenre(name: any): void {
    this.fetchApiData.getGenre(name).subscribe((resp: any) => {
      this.genre = resp;
      console.log(this.genre);
      return this.genre;
    });
  }
}
