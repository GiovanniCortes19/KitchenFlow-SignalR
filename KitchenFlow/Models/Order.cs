using System.Text.Json.Serialization;

namespace KitchenFlow.Models;

public class Order
{
  public int ID { get; set; }
  public int TableNumber { get; set; }
  public int FoodItemID { get; set; }
  public FoodItem FoodItem { get; set; }
  public DateTimeOffset OrderDate { get; set; }
  public OrderStatus OrderStatus { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OrderStatus
{
  Ordered,
  Preparing,
  AwaitingDelivery,
  Delivered
}