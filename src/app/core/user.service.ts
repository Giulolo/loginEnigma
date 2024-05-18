import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public toAuth: AngularFireAuth) { }

  getCurrentUser(): Promise<User> {
    return new Promise<any>((resolve, reject) => {
      this.toAuth.onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(userUpdatedInfos: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user = this.toAuth.currentUser.then(user => {
        user?.updateProfile({
          displayName: userUpdatedInfos.name,
          photoURL: userUpdatedInfos.photoURL
        }).then(res => {
          return resolve(res);
        }, err => reject(err));
      });
      });
  }
}
