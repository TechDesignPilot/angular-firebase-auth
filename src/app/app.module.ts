import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [
    // place your Firebase configuration here
    provideFirebaseApp(() => initializeApp({
      "projectId": "YOUR_PROJECT_ID",
      "appId": "YOUR_APP_ID",
      "storageBucket": "YOUR_STORAGE_BUCKET",
      "apiKey": "YOUR_API_KEY",
      "authDomain": "YOUR_AUTH_DOMAIN",
      "messagingSenderId": "YOUR_MESSAGING_SENDER_ID"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
