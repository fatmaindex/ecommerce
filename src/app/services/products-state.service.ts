import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ProductsService } from "./products.service";
import { IProduct } from "../models/IProduct";

@Injectable({
  providedIn: "root",
})
export class ProductsStateService {
  private productsSource = new BehaviorSubject<IProduct[]>([]);
  products$ = this.productsSource.asObservable();

  private totalPagesSource = new BehaviorSubject<number>(1);
  totalPages$ = this.totalPagesSource.asObservable();

  private pageSource = new BehaviorSubject<number>(1);
  page$ = this.pageSource.asObservable();

  private categorySource = new BehaviorSubject<string>("all");
  category$ = this.categorySource.asObservable();

  private sortSource = new BehaviorSubject<string>("default");
  sort$ = this.sortSource.asObservable();

  private limit = 12;

  constructor(private productsService: ProductsService) {}

  loadProducts() {
    let category = this.categorySource.getValue();
    let page = this.pageSource.getValue();
    let sortOption = this.sortSource.getValue();

    this.productsService.getProducts("", category,sortOption, page, this.limit).subscribe({
      next: (res) => {
        this.productsSource.next(res.products);
        this.totalPagesSource.next(res.totalPages);
        this.pageSource.next(res.pageNumber);
        this.limit = res.limit;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.log("done"),
    });
  }

  setCategory(category: string): void {
    this.categorySource.next(category);
    this.pageSource.next(1);
    this.loadProducts();
  }
  setSort(sortOption: string): void {
    this.sortSource.next(sortOption);
    // this.pageSource.next(1);
    this.loadProducts();
  }
  setPage(newPage: number): void {
    this.pageSource.next(newPage);
    this.loadProducts();
  }
  search(searchQuery: string): void {
    this.productsService.getProducts(searchQuery).subscribe({
      next: (res) => {
        this.productsSource.next(res.products);
        this.totalPagesSource.next(res.totalPages);
        this.pageSource.next(res.pageNumber);
        this.limit = res.limit;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.log("done"),
    });
  }
}
