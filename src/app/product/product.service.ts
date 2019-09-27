import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private PRODUCTS_URL = "https://my-json-server.typicode.com/cristoaquiza/store-json-server/products"

  constructor(private http: HttpClient)  {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_URL);
  }
}