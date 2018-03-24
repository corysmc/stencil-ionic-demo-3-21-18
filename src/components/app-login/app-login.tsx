import { Component, Prop } from "@stencil/core";

@Component({
  tag: "app-login",
  styleUrl: "app-login.scss"
})
export class AppLogin {
  @Prop() firebase;

  googleLogin() {
    console.log("google login");
    const provider = new this.firebase.auth.GoogleAuthProvider();
    this.firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log('result', result);
      });
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">{/* <ion-menu-button /> */}</ion-buttons>
          <ion-title>Login Page</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-button onClick={() => this.googleLogin()}>Google Login</ion-button>
      </ion-content>
    ];
  }
}
