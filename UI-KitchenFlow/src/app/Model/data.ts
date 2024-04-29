// Food Item
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
}

// Food List
export interface FoodList {
  items: FoodItem[];
}

// Order
export interface Order {
  id: number;
  tableNumber: number;
  foodItemId: number;
  footItem: FoodItem;
  orderDate: Date; // Date for DateTimeOffset
  orderStatus: OrderStatus;
}

// Order Status
export enum OrderStatus {
  Ordered = 'Ordered',
  Preparing = 'Preparing',
  AwaitingDelivery = 'AwaitingDelivery',
  Delivered = 'Delivered',
}

// Food Request
export interface FoodRequest {
  foodId: number;
  table: number;
}
