import { Component, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-search-bar",
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: "./search-bar.component.html",
  styleUrl: "./search-bar.component.scss",
})
export class SearchBarComponent {
  searchForm = new FormGroup({
    searchQuery: new FormControl(""),
  });
  @Output() onSearch = new EventEmitter<string>();
  
  search() {
    const value = this.searchForm.get("searchQuery")?.value;
    this.onSearch.emit(value || "");
  }
}
