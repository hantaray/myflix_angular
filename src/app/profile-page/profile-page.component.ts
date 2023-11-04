import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent {
  userOld: any = [];
  user: any = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user) {
      console.log('this.user', this.user)
      this.userOld = JSON.parse(this.user);
      this.user = JSON.parse(this.user);
      this.userData = {
        Username: this.userOld.username, Password: this.userOld.password, Email: this.userOld.email,
        Birthday: this.userOld.birthday
      };
    }
  }

  updateUser(): void {
    this.fetchApiData.updateUser(this.userOld.username, this.userData).subscribe((resp: any) => {
      this.snackBar.open(resp, 'Update succesful', {
        duration: 2000
      });
    });
    localStorage.setItem('user', JSON.stringify(this.userData));
  }
}
