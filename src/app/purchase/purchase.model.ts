import { Product } from "../product/product.model";
export interface Purchase {
  id: number;
  date: number;
  products: Product[];
  total: number;
}
