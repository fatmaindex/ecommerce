import { Component } from "@angular/core";
import { ProductsStateService } from "../products-state.service";
import { CommonModule } from "@angular/common";
import { FilterBarComponent } from "../filter-bar/filter-bar.component";
import { ProductsComponent } from "../products/products.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { NewsLettersComponent } from "../../../shared/components/news-letters/news-letters.component";

@Component({
  selector: "app-shop",
  standalone: true,
  imports: [
    CommonModule, 
    FilterBarComponent, 
    ProductsComponent, 
    PaginationComponent, 
    NewsLettersComponent
  ],
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
