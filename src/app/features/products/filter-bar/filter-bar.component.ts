import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filter-bar",
  templateUrl: "./filter-bar.component.html",
  styleUrls: ["./filter-bar.component.scss"],
})
export class FilterBarComponent {
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
  @Output() categoryChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortChanged: EventEmitter<string> = new EventEmitter<string>();

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.categoryChanged.emit(this.selectedCategory);
  }
  onSortChange(sortOption: string) {
    this.sortBy = sortOption;
    this.sortChanged.emit(this.sortBy);
  }
  onResetClick() {
    this.selectedCategory = "all";
    this.categoryChanged.emit(this.selectedCategory);

    this.sortBy = "default";
    this.sortChanged.emit(this.sortBy);
  }
}
