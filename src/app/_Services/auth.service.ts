import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../_Models/User';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {
    
    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFirestore,
    ) {
        this.user$ = this.afAuth.authState
            .switchMap(user => {
                if(user) {
                    return this.db.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return Observable.of(null);
                }
            });
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.updateUserData(credential.user);
            })
    }

    private updateUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            photoURL: user.photoURL,
            name: user.displayName,
            email: user.email,
            roles: {
                dummyProp: true
            },
            createdAt: user.metadata.a,
            lastLogin: user.metadata.b
        }
        return userRef.set(data, { merge: true });
    }

    isValid(user: User): boolean {
        const allowedRoles = ['standard'];
        return this.checkAuthorization(user, allowedRoles);
    }

    isAdmin(user: User): boolean {
        const allowedRoles = ['admin'];
        return this.checkAuthorization(user, allowedRoles);
    }

    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
        if(!user) { return false; }
        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }
        return false;
    }

    loggedIn() {
        if (localStorage.getItem('firebase:authUser:AIzaSyDj7YBJbNFUDtsDthW2vk8WIJj8tX9gS4M:[DEFAULT]') != null) {
            return true;
        } else {
            return false;
        }
    }

    signOut() {
        this.afAuth.auth.signOut();
    }
    
}
