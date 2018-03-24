import { Component, Prop, State } from "@stencil/core";
import { ModalController, ModalOptions } from '@ionic/core';

@Component({
  tag: "app-home",
  styleUrl: "app-home.scss"
})
export class AppHome {
  private phonesRef;

  @Prop() firebase;
  @Prop() user;
  @Prop({ connect: 'ion-modal-controller' })
  modalCtrl: ModalController;
  @State() phones: Array<phone> = [];

  componentDidLoad() {
    const db = this.firebase.firestore();
    const uid = this.user.uid;
    this.phonesRef = db.collection(`users/${uid}/phones`)
    this.phonesRef.onSnapshot(querySnapshot => {
      var phones = [];
      querySnapshot.docs.map(doc => {
        console.log("doc", doc.data());
        var phone = doc.data();
        return phones.push(phone);
      });
      this.phones = phones;
    });
  }

  addPhone(phone){
    var newDoc = this.phonesRef.doc()
    newDoc.set({
      ...phone,
      id: newDoc.id
    })
  }

  showPhoneModal() {
    const modalOptions: ModalOptions = {
      enableBackdropDismiss: false,
      component: 'app-profile',
      data: {
        // service: this.service
      }
    };
    this.modalCtrl.create(modalOptions).then(modal => {
      modal.present();
    });
  }

  updatePhone(phone){
    var existingDoc = this.phonesRef.doc(phone.id)
    existingDoc.set(phone)
  }
  
  deletePhone(id) {
    this.phonesRef.doc(id).delete()
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button />
          </ion-buttons>
          <ion-title>Home Page</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <p>
          Welcome to the Ionic PWA Toolkit. You can use this starter to build
          entire PWAs all with web components using Stencil and ionic/core!
          Check out the readme for everything that comes in this starter out of
          the box and Check out our docs on
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <ion-button href="/profile/stencil">Profile page</ion-button>

        <ion-list>
          {this.phones.map(phone => {
            return (
              <ion-item href={`/phones/${phone.id}`}>
                <ion-label>{phone.name}</ion-label>
              </ion-item>
            );
          })}
        </ion-list>
      </ion-content>
    ];
  }
}
