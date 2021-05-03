import { Component, Injectable  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthService {
  public loggedIn: boolean=true;
  public user: any;

  constructor(public afAuth: AngularFireAuth) {
  }

 /*isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }*/

  loginWithGoogle() {
   // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
   //this.afAuth.auth.signOut();
  }
  

  /*loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    //TODO: no se agrega aca vez por que lo previene desde la configuracion de firebase
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({prompt: 'select_account'});
    this.afAuth.auth.signInWithPopup(provider) 
    .then(function(googleUser) {
      //console.log('Google Auth Response', googleUser);
      // This gives you a Google Access Token.
      var token = googleUser.credential.accessToken;
      // The signed-in user info.
      var localuser = googleUser.user;
      console.log('Google token', token);
      console.log('Google user', localuser);
      //this.user= googleUser.user.authState;
      //TODO con el token recibido ver si hay que  mandarlo en cada peticion o si ya lo maneja firebase
      //leer mas eso
  }).catch(function(error) {
    console.log(error); // "auth/internal-error"  , etc
    // An error happened.
    // Handle Errors here.
  });
  }*/

  loginWithEmail(email: string, password: string) {
    this.afAuth
  //    .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('loginWithEmail Auth Response', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

/*  loginAnonymous() {
    return this.afAuth.auth.signInAnonymously().then(function(result){
      console.log('Anonymous Auth Response', result);
    }).catch(function(error) {
      console.log(error);
      // Handle Errors here.
    });
  }*/

  /*logout() {
    this.afAuth.auth.signOut().then(function() {
      console.log('Sign-out successful.');
    }, function(error) {
       console.log('Error Sign-out.');
    });
  }*/
}
