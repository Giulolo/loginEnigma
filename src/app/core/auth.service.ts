import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
} from '@angular/fire/auth';

// import { auth } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();
  constructor(public angularFirebaseAuth: AngularFireAuth) {}

  doFacebookLogin() {
    return this.authLogin(new FacebookAuthProvider());
  }

  doGoogleLogin() {
    return this.authLogin(new GoogleAuthProvider());
  }

  doRegister(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    zipcode: string
  ) {
    return this.angularFirebaseAuth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  doLogin(
    email: string,
    password: string
  ) {
    return this.angularFirebaseAuth.signInWithEmailAndPassword(email, password);
  }

  // doLogin(email: string, password: string) {
  //   signInWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       console.log(user)
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // }

  // doLogin(
  //   email: string,
  //   password: string
  // ) {
  //   return auth().signInWithEmailAndPassword(email, password).then(result => {
  //     if (result.user) {
  //       var user = result.user;
  //     }
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // }

  doLogOut() {
    return this.angularFirebaseAuth.signOut();
  }

  authLogin(provider: any) {
    return this.angularFirebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        alert('You have been successfully logged in!');
      })
      .catch((error) => {
        alert(error);
      });
  }

  checkLogin(): Promise<User> {
    return new Promise<any>((resolve, reject) => {
      this.angularFirebaseAuth.onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in!');
        }
      });
    });
  }
}
