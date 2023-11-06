import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/**
 * Component representing a registration form.
 */
export class UserRegistrationFormComponent implements OnInit {
  /** 
     * @name userData
     * @description Holds the user data for the registration form.
     */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  /** 
   * @name constructor
   * @description Initializes the UserRegistrationFormComponent with required services and dependencies.
   * @param fetchApiData - Service for making API calls.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Service for showing notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /** 
 * @name ngOnInit
 * @description Lifecycle hook that is called after data-bound properties are initialized.
 */
  ngOnInit(): void {
  }

  /** 
   * @name registerUser
   * @description Sends user registration data to the backend.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}