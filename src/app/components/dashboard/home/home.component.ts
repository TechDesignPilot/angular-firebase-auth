import { Component, inject } from '@angular/core';
import { Auth, User, signOut } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  // get the user from the route (which is injected by the UserResolver)
  user: User = this.activatedRoute.snapshot.data['user'];

  // get the auth service
  auth = inject(Auth);

  constructor() {
    console.log('Logged in user:', this.user);
  }

  onSignOut() {
    signOut(this.auth).then(response => {
      this.router.navigate(['/auth/sign-in']);
    })
      .catch(error => {
        console.error('Error occurred:', error);
      })
  }
}
