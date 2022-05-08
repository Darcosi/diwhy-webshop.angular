import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throws } from 'assert';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/cart.service';
import { NewItem } from '../shared/new-item.model';
import { NewItemService } from '../shared/new-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  wannaFoam: boolean = false;

  orderBys:Array<{id: string, name: string}> = [
    {id: "expensiveToCheap", name: "Expensive to cheap"},
    {id: "cheapToExpansive", name: "Cheap to expensive"},
    {id: "alpha", name: "Alphabetic"},
    {id: "alphaReverse", name: "Reverse alphabetic"},
  ];

  constructor(public service : NewItemService, private toastr: ToastrService, private carserv: CartService) { }

  ngOnInit(): void {
    this.changeToFoam(false);
    this.loading = true;
    this.getItemsService("name", "asc");
    this.getFoamItemsService("name", "asc");
  }
  
  lista: NewItem[];
  getItemsService(name: string, direction: "asc" | "desc") {
    this.service.getItems(name, direction).subscribe(actionArray => {
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
    })
  }

  foamLista: NewItem[];
  getFoamItemsService(name: string, direction: "asc" | "desc") {
    this.service.getFoamItems(name, direction).subscribe(actionArray => {
      this.foamLista = actionArray.map(i => {
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

  chosenOrder: {id: string, name: string};
  changeOrder() {
    switch (this.chosenOrder.id) {
      case "expensiveToCheap":
          this.getItemsService("price", "desc");
        break;
      case "cheapToExpansive":
        this.getItemsService("price", "asc");
        break;
      case "alpha":
        this.getItemsService("name", "asc");
        break;
      case "alphaReverse":
        this.getItemsService("name", "desc");
        break; 
    }
  }

  changeToFoam(really: boolean) {
    this.wannaFoam = really;
  }

  addToCart(i: NewItem) {
    this.toastr.success(i.name+" has been added to your cart!","Cart");
    this.carserv.addToCart(i);
  }

}
