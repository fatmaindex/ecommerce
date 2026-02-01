import { Component, Output, EventEmitter } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: "./filter-bar.component.html",
  styleUrl: "./filter-bar.component.scss"
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
