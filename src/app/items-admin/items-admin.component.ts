import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-admin',
  templateUrl: './items-admin.component.html',
  styleUrls: ['./items-admin.component.scss']
})
export class ItemsAdminComponent implements OnInit {

  constructor() { }

  itemToShow = true;

  ngOnInit(): void {
  }

  changeSide(value: string) {
    if (value === "items") {
      this.itemToShow = true;
    }
    else {
      this.itemToShow = false;
    }
  }

}
