import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './user.module';
import { collection, doc, getDoc, getFirestore, onSnapshot, query, QuerySnapshot, where, getDocs } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: User;

  constructor(private router: Router, private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    // this.logout();
    // this.router.navigate(["home"]);
  }


  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    localStorage.setItem("cart", "[]");

    let tempUserData = {
      email: "",
      isAdmin: false,
      address: "",
      name: "",
      phone: ""}; 
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.firestore.collection("users").doc(user.uid).ref.get().then((doc: any) => {
          if (doc.exists) {
            // console.log(doc.data());
            this.userData = {
              email: doc.get("email"),
              isAdmin: false,
              address: doc.get("address"),
              name: doc.get("name"),
              phone: doc.get("phone")
            };
            console.log("THIS IIIIISSSSSS!");
            console.log(this.userData)
            localStorage.setItem("cartUser", JSON.stringify(this.userData));
          }
        });
      }
    });
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    localStorage.setItem("cart", "[]");
    localStorage.setItem("cartUser", "{}");
    this.userData = {
      email: "",
      isAdmin: false,
      address: "",
      name: "",
      phone: ""};
    return this.auth.signOut();
  }

  isLoggedIn() {
    return this.auth.user;
  }
}
