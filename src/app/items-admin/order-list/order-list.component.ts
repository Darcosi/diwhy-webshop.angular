import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { CartService } from 'src/app/shared/cart.service';
import { NewItem } from 'src/app/shared/new-item.model';
import { Cart } from '../../shared/cart.module';
import { NewItemService } from '../../shared/new-item.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  loading: boolean = false;

  constructor(private service: NewItemService, private cartserv: CartService) { }

  ngOnInit(): void {
    // this.service.getItems("name", "asc").subscribe(actionArray => {
    //   this.lista = actionArray.map(i => {
    //     this.loading = false;
    //     const data = i.payload.doc.data() as NewItem
    //     return {
    //       id: i.payload.doc.id,
    //       description: data.description,
    //       image: data.image,
    //       name: data.name,
    //       price: data.price
    //     } as unknown as NewItem;
    //   })
    // });

    this.cartserv.getOrders().subscribe(actionArray => {
      this.oLista = actionArray.map(o => {
        const data = o.payload.doc.data() as CartWithCart
        return {
          address: data.address,
          email: data.address,
          name: data.name,
          phone: data.phone,
          items: data.cart
        }
      })
    })
  }
  
  oLista: Cart[];
  lista: NewItem[];
  // getItems = () => this.service.getItems().subscribe(res => (this.lista = res));
}

export class CartWithCart {
  email: string = "";
  address: string = "";
  name: string = "";
  phone: string = "";
  cart: Array<NewItem> = [];
}
