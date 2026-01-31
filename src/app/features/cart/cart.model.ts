export interface CartProduct {
  _id: string; 
  title: string;
  price: number;
  image: string;
category:string;
}

export interface CartItem {
  productId: CartProduct; 
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}