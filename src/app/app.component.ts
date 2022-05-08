import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CartService } from './shared/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'diwhy-webshop';

  constructor(private cartserv: CartService) {}

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {sidenav.close();}
  }

  ngOnInit() {
    // alert("MAIN CALLED");
    this.cartserv.ngOnInit();
  }

  ngOnChanges(): void {
    // alert("CHANGES");
  }
}
