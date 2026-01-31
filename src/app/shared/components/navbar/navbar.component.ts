// import { CartService } from '../../services/cart.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.scss'
// })
// export class NavbarComponet {
//   cartProductsNum:number|null=null;

//   constructor(private cartService: CartService) {
//    this.cartService.cartProductsNumSubject.subscribe(num=>{
//     this.cartProductsNum=num
//    })
//   }

// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent {

//   isActive = false;

//   toggleMenu() {
//     this.isActive = !this.isActive;
//   }

//   closeMenu() {
//     this.isActive = false;
//   }
// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent {

//   isActive = false;

//   toggleMenu() {
//     this.isActive = !this.isActive;
//   }

//   closeMenu() {
//     this.isActive = false;
//   }

// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent {

//   isActive = false;

//   toggleMenu() {
//     this.isActive = !this.isActive;
//   }

//   closeMenu() {
//     this.isActive = false;
//   }

// }

import { Component } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  isActive = false;

  closeMenu() {
    this.isActive = false;
  }
  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
