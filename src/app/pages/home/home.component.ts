import { Component, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ProductsServiceService } from "./../../services/products-service.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  // Filter and Sort properties
  categories = [
    "Tops",
    "Jackets",
    "Dresses",
    "Pants / Jeans",
    "Skirts",
    "Hoodies / Sweatshirts",
    "Sportswear",
    "Men fashion",
  ];
  selectedCategory = "all";
  sortBy = "default";

  updateCategory(category: string) {
    this.selectedCategory = category;
  }

  updateSort(sort: string) {
    this.sortBy = sort;
  }

  resetFilters() {
    this.selectedCategory = "all";
    this.sortBy = "default";
  }
  // End of Filter and Sort properties
  constructor(
    private ProductsServiceService: ProductsServiceService,
    private HttpClient: HttpClient
  ) {}
  search(searchInputValue: string): void {
    this.ProductsServiceService.searchEmmeter.emit(searchInputValue);
  }
}
