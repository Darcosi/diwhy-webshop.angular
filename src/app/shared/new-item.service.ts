import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FieldPath } from 'firebase/firestore';
import { NewItem } from './new-item.model';

@Injectable({
  providedIn: 'root'
})
export class NewItemService {
  formData: NewItem;

  constructor(private firestore: AngularFirestore) { }

  createItem(data: NewItem) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection("items")
          .add(data)
          .then(res => {resolve(res)}, err => reject(err));
    });
  }

  getItems(order: string, direction: "asc" | "desc") {
    // return this.firestore.collection("items").snapshotChanges();
    return this.firestore.collection("items", ref => ref.orderBy(order, direction).limit(63)).snapshotChanges();
  }

  getFoamItems(order: string, direction: "asc" | "desc") {
    // return this.firestore.collection("items").snapshotChanges();
    return this.firestore.collection("items", ref => ref.where("name", ">=", "Spray").orderBy(order, direction).limit(3)).snapshotChanges();
  }

  updateItem(data: NewItem) {
    let itemId = data.id;
    // delete data.id;

    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("items")
          .doc(itemId)
          .update(data)
          .then(res => {resolve(res)}, err => reject(err));
    });
  }

  deleteItem(data: NewItem) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("items")
          .doc(data.id).delete()
          .then(res => {resolve(res)}, err => reject(err));
    });
  }
}
