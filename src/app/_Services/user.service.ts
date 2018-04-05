import { Injectable } from '@angular/core';
import { User } from '../_Models/User';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class UserService {
  
  private usersRef: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;

  constructor(
    private db: AngularFirestore
  ) { }

  getUsers() {
    this.usersRef = this.db.collection<User>('users', ref => ref.orderBy('name'));
    this.users$ = this.usersRef.valueChanges();
    return this.users$;
  }

  toggleInvalidRole(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
      const data : User = {
        uid : user.uid,
        photoURL: user.photoURL,
        name: user.name,
        email: user.email,
        roles: {
            standard: false,
            admin: false
        },
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
      return userRef.set(data, { merge: true });
  }

  toggleStandardRole(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
      const data : User = {
        uid : user.uid,
        photoURL: user.photoURL,
        name: user.name,
        email: user.email,
        roles: {
            standard: true,
            admin: false
        },
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
      return userRef.set(data, { merge: true });
  }

  toggleAdminRole(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
      const data : User = {
        uid : user.uid,
        photoURL: user.photoURL,
        name: user.name,
        email: user.email,
        roles: {
            standard: true,
            admin: true
        },
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
      return userRef.set(data, { merge: true });
  }

}
