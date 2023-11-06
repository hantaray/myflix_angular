import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @name DirectorDialogComponent
 * @description Component for rendering director dialog.
 */
@Component({
  selector: 'app-genre-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent {
  director: any = [];

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
    this.getDirector(this.data.movie.director.name);
  }

  /**
   * Gets the director by name.
   * @param name Director's name.
   */
  getDirector(name: any): void {
    this.fetchApiData.getDirector(name).subscribe((resp: any) => {
      this.director = resp;
      return this.director;
    });
  }
}
