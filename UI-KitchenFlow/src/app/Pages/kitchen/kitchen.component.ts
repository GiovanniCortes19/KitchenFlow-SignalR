import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Order, OrderStatus } from '../../Model/data';
import { DatePipe } from '@angular/common';
import { firstValueFrom, Subscription } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RealTimeClientService } from '../../Services/real-time-client.service';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [DatePipe, HttpClientModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css',
})
export class KitchenComponent implements OnInit, OnDestroy {
  /* existing orders signal */
  existingOrders = signal<Array<Order>>([]);

  /* active orders subscription */
  activeOrdersSubscription?: Subscription;

  /* food statuses */
  foodStatuses = Object.values(OrderStatus);

  constructor(
    private http: HttpClient,
    private realtime: RealTimeClientService
  ) {}

  async ngOnInit() {
    // load existing orders
    let orders = await firstValueFrom(
      this.http.get<Array<Order>>(
        'http://localhost:4200/api/Kitchen/GetExistingOrders'
      )
    );
    this.existingOrders.set([...orders]);

    // subscribe to realtime updates
    this.activeOrdersSubscription = this.realtime.ordersUpdated$.subscribe(
      (orders) => this.existingOrders.set([...orders])
    );
  }

  ngOnDestroy(): void {
    this.activeOrdersSubscription?.unsubscribe();
  }

  /* updateStatus method */
  async updateStatus(id: number, $event: Event) {
    let status = ($event.target as HTMLSelectElement).value;
    await this.realtime.updateFoodItem(id, status as OrderStatus);
  }
}
