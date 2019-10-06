import { Product } from "../product/product.model";
export interface Purchase {
  id: number;
  date: string;
  products: Product[];
  total: number;
}
