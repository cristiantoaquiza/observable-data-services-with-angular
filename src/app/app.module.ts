import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { StoreProductsComponent } from "./store-products/store-products.component";
import { StorePurchasesComponent } from "./store-purchases/store-purchases.component";
import { StoreProduct } from "./store-products/store-product.component";

@NgModule({
  declarations: [AppComponent, StoreProductsComponent, StoreProduct, StorePurchasesComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
