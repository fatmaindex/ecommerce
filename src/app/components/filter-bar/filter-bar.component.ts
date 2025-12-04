import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
 @Input() categories: string[] = [];
  @Input() selectedCategory: string = 'all';
  @Input() sortBy: string = 'default';

  @Output() selectedCategoryChange = new EventEmitter<string>();
  @Output() sortByChange = new EventEmitter<string>();
  @Output() reset = new EventEmitter<void>();

  onCategoryChange(value: string) {
    this.selectedCategoryChange.emit(value);
  }

  onSortChange(value: string) {
    this.sortByChange.emit(value);
  }

  onResetClick() {
    this.reset.emit();
  }
}
