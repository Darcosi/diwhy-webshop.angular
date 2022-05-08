import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(null, [
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.minLength(6)
    ]),
    address: new FormControl(''),
    name: new FormControl(''),
    phone: new FormControl('')
  });


  constructor(private userv: UserService, private router: Router, private toastr: ToastrService, private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  onSubmit() {
    return this.userv.register(this.registerForm.value.email, this.registerForm.value.password).then(cred => {
      // alert(this.registerForm.value.email + " " + this.registerForm.value.password)
      this.toastr.success("Registered successfully!", "Registration");
      this.userv.login(this.registerForm.value.email, this.registerForm.value.password).then(cred => {

        this.auth.onAuthStateChanged((user) => {
          if (user) {

            this.firestore.collection("users").doc(user.uid).set({
              address: this.registerForm.value.address,
              email: this.registerForm.value.email,
              isAdmin: false,
              name: this.registerForm.value.name,
              phone: this.registerForm.value.phone
            });

            // alert(user.uid);
          }
        });

        this.router.navigate(["admin"]);
      }).catch(error => {
        this.toastr.error("Email or password is incorrect!", "Login error");
      });
    }).catch(error => {
      this.toastr.error("Incorrect data!", "Can't register");
    });;
  }

}
