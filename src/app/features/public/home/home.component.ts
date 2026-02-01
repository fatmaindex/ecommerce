import { Component } from "@angular/core";
import { ProductsStateService } from "../../products/products-state.service";
import { HeroComponent } from "../../../shared/components/hero/hero.component";
import { FeaturesComponent } from "../../../shared/components/features/features.component";
import { SearchBarComponent } from "../../products/search-bar/search-bar.component";
import { FilterBarComponent } from "../../products/filter-bar/filter-bar.component";
import { ProductsComponent } from "../../products/products/products.component";
import { PaginationComponent } from "../../products/pagination/pagination.component";
import { BannersComponent } from "../../../shared/components/banners/banners.component";
import { NewsLettersComponent } from "../../../shared/components/news-letters/news-letters.component";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    FeaturesComponent,
    SearchBarComponent,
    FilterBarComponent,
    ProductsComponent,
    PaginationComponent,
    BannersComponent,
    NewsLettersComponent
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
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
