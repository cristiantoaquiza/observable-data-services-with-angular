import { Component, OnInit } from "@angular/core";
import { PurchaseService } from "../purchase/purchase.service";
import { Observable } from "rxjs";
import { Purchase } from "../purchase/purchase.model";

@Component({
  selector: "store-cart",
  template: `
    <h2>Your Cart</h2>
    <ul>
      <li *ngFor="let product of cart.products">{{ product.title }}: \${{ product.price }}</li>
    </ul>
  `
})
export class StoreCartComponent implements OnInit {
  public cart: Purchase;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchaseService.cart$.subscribe((cart: Purchase) => {
      this.cart = cart;
    });
  }
}
