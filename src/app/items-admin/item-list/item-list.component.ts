import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { NewItem } from 'src/app/shared/new-item.model';
import { NewItemService } from '../../shared/new-item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  loading: boolean = false;

  constructor(private service: NewItemService) { }

  ngOnInit(): void {
    this.loading = true;
    this.service.getItems("name", "asc").subscribe(actionArray => {
      this.lista = actionArray.map(i => {
        this.loading = false;
        const data = i.payload.doc.data() as NewItem
        return {
          id: i.payload.doc.id,
          description: data.description,
          image: data.image,
          name: data.name,
          price: data.price
        } as unknown as NewItem;
      })
    });
  }
  
  lista: NewItem[];
  // getItems = () => this.service.getItems().subscribe(res => (this.lista = res));

  onEdit(i: NewItem) {
    this.service.formData = Object.assign({}, i); // = Object.assign({}, i);  Ha nem akarjuk hogy a listában is látszódjon a frissítés
    
    // Only for scrolling
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scrollTo(0,0);
  }

  onDelete(i: NewItem) {
    if(confirm("Are you sure to delete this item?")) {
      this.service.deleteItem(i);
    }
  }

}
