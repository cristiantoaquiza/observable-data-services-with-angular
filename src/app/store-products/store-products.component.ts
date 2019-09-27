import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product/product.service";
import { Observable } from "rxjs";
import { Product } from "../product/product.model";

@Component({
  selector: "store-products",
  template: `
    <h2>Allowed Products</h2>
    <ul>
      <li *ngFor="let product of products$ | async">
        {{ product.title }}: \${{ product.price }}
      </li>
    </ul>
  `
})
export class StoreProductsComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }
}
