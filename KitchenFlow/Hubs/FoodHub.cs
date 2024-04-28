using KitchenFlow.Contexts;
using KitchenFlow.Models;
using KitchenFlow.Models.RealTime;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace KitchenFlow;

public class FoodHub : Hub<IFoodOrderClient>
{

  private readonly DataContext _context;
  public FoodHub(DataContext context)
  {
    _context = context;
  }

  // Order Food
  public async Task OrderFoodItem(FoodRequest request)
  {
    _context.Orders.Add(new Order()
    {
      FoodItemID = request.foodId,
      OrderDate = DateTimeOffset.Now,
      TableNumber = request.table,
      OrderStatus = OrderStatus.Ordered
    });

    await _context.SaveChangesAsync();
    await EmitActiveOrders();
  }

  // Update Food Item
  public async Task UpdateFoodItem(int orderId, OrderStatus status)
  {
    var order = await _context.Orders.FindAsync(orderId);
    if (order != null)
    {
      order.OrderStatus = status;
    }

    await _context.SaveChangesAsync();
    await EmitActiveOrders();
  }

  // Emit Orders
  public async Task EmitActiveOrders()
  {
    var orders = _context.Orders.Include(o => o.FoodItem).Where(o => o.OrderStatus != OrderStatus.Delivered).ToList();
    await Clients.All.PendingFoodUpdated(orders);
  }

  // On Connection
  public override async Task OnConnectedAsync()
  {
    Console.WriteLine(Context.ConnectionId);
    await base.OnConnectedAsync();
  }

  // On Disconnection
  public override async Task OnDisconnectedAsync(Exception? ex)
  {
    Console.WriteLine(Context.ConnectionId);
    await base.OnDisconnectedAsync(ex);
  }



}

// RPC Calls on the client
public interface IFoodOrderClient
{
  Task PendingFoodUpdated(List<Order> orders);
}