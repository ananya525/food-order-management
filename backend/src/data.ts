import { MenuItem, Order } from "./types";

export const menu: MenuItem[] = [
  {
    id: "pizza-margherita",
    name: "Margherita Pizza",
    description: "Classic tomato, mozzarella and basil pizza.",
    price: 299,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800"
  },
  {
    id: "classic-burger",
    name: "Classic Burger",
    description: "Grilled veggie patty with lettuce, tomato and sauce.",
    price: 199,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
  },
  {
    id: "white-pasta",
    name: "Creamy White Pasta",
    description: "Creamy penne pasta with herbs and vegetables.",
    price: 249,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800"
  },
  {
    id: "french-fries",
    name: "French Fries",
    description: "Crispy golden fries with a light seasoning.",
    price: 129,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800"
  }
];

export const orders: Order[] = [];
