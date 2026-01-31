import { Component } from "@angular/core";
import { Product } from "../../../shared/models/product.model";
import { ProductsStateService } from "../products-state.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"],
})
export class ShopComponent {

  products$;
  totalPages$;
  page$;
  
  constructor(private state: ProductsStateService) {
    this.products$ = this.state.products$;
    this.totalPages$ = this.state.totalPages$;
    this.page$ = this.state.page$;
  }
  
  ngOnInit(): void {
    this.state.loadProducts();
  }
  onCategorySelected(category: string) {
    this.state.setCategory(category);
  }
onSortChanged(sortOption: string) {
    this.state.setSort(sortOption);
  }
  onPageChanged(page: number) {
    this.state.setPage(page);
  }

  search(value: string) {
    this.state.search(value);
  }
}
