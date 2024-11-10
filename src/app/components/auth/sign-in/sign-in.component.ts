import { Component, inject } from '@angular/core';
import { Auth, AuthErrorCodes, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithPopup } from '@firebase/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  authForm!: FormGroup;

  // init the google auth provider
  googleAuthProvider = new GoogleAuthProvider();

  // auth instance
  auth = inject(Auth);

  isSubmissionInProgress: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {
    this.initForm();
  }

  initForm() {
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  onSubmit() {
    if (this.authForm.invalid)
      return

    this.isSubmissionInProgress = true;

    // if the form is valid, sign-in the user
    signInWithEmailAndPassword(this.auth, this.authForm.value.email, this.authForm.value.password)
      .then((response) => {
        this.redirectToDashboardPage();
      })
      .catch(error => {
        this.isSubmissionInProgress = false;
        console.error('error:', error);
        if (error instanceof Error) {
          if (error.message.includes(AuthErrorCodes.INVALID_EMAIL)) {
            this.errorMessage = "Email is not valid";
          }
          else if (error.message.includes('auth/invalid-credential')) {
            this.errorMessage = 'Invalid Email/Passowrd';
          }
          else if (error.message.includes(AuthErrorCodes.WEAK_PASSWORD)) {
            this.errorMessage = 'Please enter a stronger password';
          }
          else if (error.message.includes(AuthErrorCodes.EMAIL_EXISTS)) {
            this.errorMessage = 'The email is already used for another account';
          }
          else {
            this.errorMessage = 'Something went wrong, please try again.';
          }
        }
      })
  }

  onSignInWithGoogle() {
    signInWithPopup(this.auth, this.googleAuthProvider)
      .then(response => {
        this.redirectToDashboardPage();
      })
      .catch(error => {
        console.error('error:', error);
        this.errorMessage = 'Something went wrong, please try again.';
      })
  }

  redirectToDashboardPage() {
    this.router.navigate(['/dashboard']);
  }
}
