import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent {
  director: any = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getDirector(this.data.movie.director.name);
  }

  getDirector(name: any): void {
    this.fetchApiData.getDirector(name).subscribe((resp: any) => {
      this.director = resp;
      return this.director;
    });
  }
}
