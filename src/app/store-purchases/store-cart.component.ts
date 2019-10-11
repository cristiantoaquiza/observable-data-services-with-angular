import { Component, OnInit } from "@angular/core";
import { Product } from "../product/product.model";
import { ProductService } from "../product/product.service";
import { Purchase } from "../purchase/purchase.model";
import { PurchaseService } from "../purchase/purchase.service";

@Component({
  selector: "store-cart",
  template: `
    <h2>Your Cart</h2>
    <span *ngIf="cart.date">{{ cart.date | date }}</span>
    <ul>
      <li *ngFor="let product of cart.products">
        {{ product.title }}: \${{ product.price }}
        <button (click)="rejectProduct(product)">Reject</button>
      </li>
    </ul>
    <span *ngIf="cart.total">Total: \${{ cart.total }}<button (click)="submit(product)">Submit</button></span>
  `
})
export class StoreCartComponent implements OnInit {
  public cart: Purchase;

  constructor(private purchaseService: PurchaseService, private productService: ProductService) {}

  ngOnInit(): void {
    this.purchaseService.cart$.subscribe((cart: Purchase) => {
      this.cart = cart;
    });
  }

  public rejectProduct(product: Product): void {
    this.productService.checkOutProduct(product);
    this.purchaseService.removeFromCart(product);
  }

  public submit(): void {
    this.purchaseService.submitCart();
  }
}
