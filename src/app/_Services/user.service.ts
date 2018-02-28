import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../_Models/User';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(
    private afStore: AngularFirestore
  ) { }

  getUsers() {
    this.usersCollection = this.afStore.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
    return this.users;
  }

  toggleAdminRole(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
      const data : User = {
        uid : user.uid,
        photoURL: user.photoURL,
        name: user.name,
        email: user.email,
        roles: {
            admin: user.roles.admin ? false : true,
            standard: true
        }
      }
      return userRef.set(data, { merge: true });
  }

}
