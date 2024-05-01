import { Component, OnInit, signal } from '@angular/core';
import { FoodItem, Order } from '../../Model/data';
import { firstValueFrom, Subscription } from 'rxjs';
import { RealTimeClientService } from '../../Services/real-time-client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgOptimizedImage],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  availableFood = signal<Array<FoodItem>>([]);
  activeOrders = signal<Array<Order>>([]);
  activeOrdersSubscription?: Subscription;

  constructor(
    private realtime: RealTimeClientService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    /* Availble Food Options */
    let food = await firstValueFrom(
      this.http.get<Array<FoodItem>>(
        `http://localhost:4200/api/FoodItems/GetFoodItems`
      )
    );
    this.availableFood.set([...food]);

    /* Active Orders */
    let orders = await firstValueFrom(
      this.http.get<Array<Order>>(
        'http://localhost:4200/api/Kitchen/GetExistingOrders'
      )
    );
    this.activeOrders.set([...orders]);

    /* Realtime Active Orders Subscription */
    this.activeOrdersSubscription = this.realtime.ordersUpdated$.subscribe(
      (orders) => {
        this.activeOrders.set([...orders]);
      }
    );
  }

  tableNumber?: number;
  showActiveOrders = false;

  /* Send Orders */
  async sendOrder(foodId: number, tableNumber: number) {
    await this.realtime.orderFoodItem(foodId, tableNumber);
  }

  /* Toggle ShowActiveOrders */
  showActiveOrdersToggle() {
    this.showActiveOrders = !this.showActiveOrders;
  }
}
