import { Component, inject } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  // inject the auth service
  auth = inject(Auth);

  router = inject(Router);

  form!: FormGroup;

  errorMessage: string = '';
  isSubmissionInProgress: boolean = false;
  isPasswordResetEmailSent: boolean = false;

  constructor() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.form.invalid)
      return;

    this.isSubmissionInProgress = true;
    // resent the password by sending a reset password link:
    sendPasswordResetEmail(this.auth, this.form.value.email)
      .then(response => {
        this.isPasswordResetEmailSent = true;
      })
      .catch(error => {
        this.isSubmissionInProgress = false;
        this.errorMessage = "An error occurred, please try again";
      })
  }
}
