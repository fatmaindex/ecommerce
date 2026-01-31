import { Component } from "@angular/core";
import { ProductsStateService } from "../../products/products-state.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
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
  onSearch(searchQuery: string) { 
    this.state.search(searchQuery);
    }
}
