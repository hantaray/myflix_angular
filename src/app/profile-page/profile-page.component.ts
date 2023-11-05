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
}
