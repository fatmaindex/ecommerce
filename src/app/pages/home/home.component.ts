import { Component, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductsServiceService } from './../../services/products-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private ProductsServiceService:ProductsServiceService, private HttpClient: HttpClient) {
  }
  search(searchInputValue: string):void{
    this.ProductsServiceService.searchEmmeter.emit(searchInputValue); 

  }
}