import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { NewItemService } from 'src/app/shared/new-item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  constructor(public service : NewItemService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: "",
      name: "",
      image: "",
      price: 0,
      description: ""
    };
    form?.form.markAsUntouched();
    form?.form.markAsPristine();
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    form.form.markAsUntouched();

    if (form.value.id !== "") {
      this.service.updateItem(data)
      .then(() => {
        this.toastr.success("Item updated successfully!", "Item update");
        this.resetForm();
      }).catch(err => {
        this.toastr.error(err, "Item update error");
      });
    }
    else {
      this.service.createItem(data)
      .then(() => {
        form.form.markAsUntouched();
        this.resetForm();
        this.toastr.success("Item added successfully!", "Item add");
      });
    }
  }

}
