import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

import "@ionic/core";
import "@stencil/core";
import { Component, Prop, State, Listen } from "@stencil/core";
import { ToastController } from "@ionic/core";

@Component({
  tag: "my-app",
  styleUrl: "my-app.scss"
})
export class MyApp {
  @Prop({ connect: "ion-toast-controller" })
  toastCtrl: ToastController;
  @State() loading: boolean = true;
  @State() user;

  componentDidLoad() {
    /*
      Handle service worker updates correctly.
      This code will show a toast letting the
      user of the PWA know that there is a 
      new version available. When they click the
      reload button it then reloads the page 
      so that the new service worker can take over
      and serve the fresh content
    */
    window.addEventListener("swUpdate", () => {
      this.toastCtrl
        .create({
          message: "New version available",
          showCloseButton: true,
          closeButtonText: "Reload"
        })
        .then(toast => {
          toast.present();
        });
    });
    this.initFirebase();
  }

  initFirebase() {
    var config = {
      apiKey: "YOUR KEY",
      authDomain: "YOUR DOMAIN",
      databaseURL: "YOUR URL",
      projectId: "YOUR PROJECT ID",
      storageBucket: "YOUR STORAGE BUCKET",
      messagingSenderId: "YOUR MESSAGING ID"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : null;
      this.loading = false;
      console.log("user authed", user);
    });
  }

  logOut() {
    firebase.auth().signOut();
  }
  @Listen("body:ionToastWillDismiss")
  reload() {
    window.location.reload();
  }

  renderRouter() {
    console.log("render router");
    return (
      <ion-router useHash={false}>
        <ion-route
          url="/"
          component="app-home"
          componentProps={{ firebase: firebase, user: this.user }}
        />
        <ion-route url="/profile/:name" component="app-profile" />
        <ion-route
          url="/login"
          component="app-login"
          componentProps={{ firebase: firebase }}
        />
        <ion-route
          url="/query/:query"
          component="query-page"
          componentProps={{ firebase: firebase, user: this.user }}
        />
        <ion-route-redirect from="/*" to={this.user ? undefined : "/login"} />
        <ion-route-redirect from="/login" to={this.user ? "/" : undefined} />
        
      </ion-router>
    );
  }

  render() {
    console.log("render my-app");
    return (
      <ion-app>
        {this.loading? null: this.renderRouter()}
        {this.loading ? (
          <ion-loading />
        ) : (
          <ion-split-pane>
            <ion-menu disabled={!this.user}>
              <ion-header>
                <ion-toolbar>
                  <ion-title>Stencil Demo</ion-title>
                </ion-toolbar>
              </ion-header>
              <ion-content>
                <ion-list>
                  <ion-menu-toggle autoHide={false}>
                    <ion-item href="/">Home</ion-item>
                  </ion-menu-toggle>
                  <ion-menu-toggle autoHide={false}>
                    <ion-item href="/profile/cory">Profile</ion-item>
                  </ion-menu-toggle>
                  <ion-item onClick={() => this.logOut()}>Log Out</ion-item>
                </ion-list>
              </ion-content>
            </ion-menu>
            <ion-nav main />
          </ion-split-pane>
        )}
      </ion-app>
    );
  }
}
