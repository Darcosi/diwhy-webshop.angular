import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cart } from './cart.module';
import { NewItem } from './new-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  cartData: Cart = {
    name: "",
    email: "",
    address: "",
    phone: "",
    items: []
  };
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    // alert("SERVICE ON INIT");
    // localStorage.setItem("cart", "[]");
    // if (this.cartData.items == undefined) {
    //   alert("UNDEFINED");
    //   this.cartData = {
    //     name: "",
    //     email: "",
    //     address: "",
    //     phone: "",
    //     items: []
    //   }
    // }
    // console.log(this.cartData.items);
  }

  order(data: Cart) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection("orders")
          .add(data)
          .then(res => {resolve(res)}, err => reject(err));
    });
  }

  addToCart(item: NewItem) {
    // alert(this.cartData.items);
    console.log(JSON.stringify(this.cartData));
    // if (this.cartData.items == []) {
    //   alert("IT WAS UNDEFINED");
    //   this.cartData.items = [];
    // }
    this.cartData.items.push(item);
    localStorage.setItem("cart", JSON.stringify(this.cartData.items));
  }

  getCart() {
    return this.cartData;
  }

  getOrders() {
    // return this.firestore.collection("items").snapshotChanges();
    return this.firestore.collection("orders").snapshotChanges();
  }

  // updateItem(data: NewItem) {
  //   let itemId = data.id;
  //   // delete data.id;

  //   return new Promise<any>((resolve, reject) => {
  //     this.firestore.collection("items")
  //         .doc(itemId)
  //         .update(data)
  //         .then(res => {resolve(res)}, err => reject(err));
  //   });
  // }
}
