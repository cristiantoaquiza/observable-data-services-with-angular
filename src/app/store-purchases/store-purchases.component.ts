import { Component, OnInit } from "@angular/core";
import { PurchaseService } from "../purchase/purchase.service";
import { Purchase } from "../purchase/purchase.model";
import { Observable } from "rxjs";

@Component({
  selector: "store-purchases",
  template: `
    <h2>Previous Purchases</h2>
    <ul>
      <li *ngFor="let purchase of purchases$ | async">
        {{ purchase.date | date }}: \${{ purchase.total }}
      </li>
    </ul>
  `
})
export class StorePurchasesComponent implements OnInit {
  public purchases$: Observable<Purchase[]>;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchases$ = this.purchaseService.purchases$;
    this.purchaseService.getPurchases();
  }
}
