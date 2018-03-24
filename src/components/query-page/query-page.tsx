import { Component, Prop, State } from "@stencil/core";

@Component({
  tag: "query-page",
  styleUrl: "query-page.scss"
})
export class QueryPage {
  @Prop() firebase;
  @Prop() user;
  @Prop() query: string;
  @State() phones: Array<phone> = [];

  componentDidLoad() {
    const query = `metadata.${this.query}`
    this.firebase
      .firestore()
      .collection(`users/${this.user.uid}/phones`)
      .where(query, '>', 0)
      .orderBy(query, 'desc')
      .limit(10)
      .onSnapshot(querySnapshot => {
        var phones = [];
        querySnapshot.docs.map(doc => {
          console.log("doc", doc.data());
          var phone = doc.data();
          return phones.push(phone);
        });
        this.phones = phones;
      });
  }
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button />
          </ion-buttons>
          <ion-title>query: {this.query}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
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
