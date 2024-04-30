import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; // Import the signalR package
import { Observable, Subject } from 'rxjs';
import { FoodRequest, Order, OrderStatus } from '../Model/data';

@Injectable({
  providedIn: 'root',
})
export class RealTimeClientService {
  private hubConnection: signalR.HubConnection;
  private pendingFoodUpdatedSubject = new Subject<Order[]>();
  ordersUpdated$: Observable<Order[]> =
    this.pendingFoodUpdatedSubject.asObservable();

  constructor() {
    // Connection to signalR hub
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:4200/foodhub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connected to SignalR Hub...'))
      .catch((err) => console.error('Error connecting to SignalR Hub: ', err));

    this.hubConnection.on('PendingFoodUpdated', (orders: Order[]) => {
      this.pendingFoodUpdatedSubject.next(orders);
    });
  }

  async orderFoodItem(foodId: number, table: number) {
    console.log('Ordering');
    await this.hubConnection.invoke('OrderFoodItem', {
      foodId,
      table,
    } as FoodRequest);
  }

  async updateFoodItem(orderId: number, status: OrderStatus) {
    console.log('Updating order');
    await this.hubConnection.invoke('UpdateFoodItem', orderId, status);
  }
}
