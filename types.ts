
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  imageUrl: string;
  category: 'luxury' | 'royal' | 'nuts' | 'bahariz' | 'egyptian' | 'saudi' | 'jordanian' | 'daily' | 'gifts';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  SMART_CHEF = 'SMART_CHEF',
}