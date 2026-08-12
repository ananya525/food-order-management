export type MenuItem = {
  id: string; name: string; description: string; price: number; image: string;
};

export type CartItem = MenuItem & { quantity: number };

export type Order = {
  id: string;
  items: { menuItemId: string; name: string; price: number; quantity: number }[];
  customer: { name: string; address: string; phone: string };
  total: number;
  status: string;
  createdAt: string;
};
