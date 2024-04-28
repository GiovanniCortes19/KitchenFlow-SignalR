using System.Text.Json.Serialization;

namespace KitchenFlow.Models.RealTime;

public class FoodRequest
{
  [JsonNumberHandling(JsonNumberHandling.AllowReadingFromString)]
  public int foodId { get; set; }

  [JsonNumberHandling(JsonNumberHandling.AllowReadingFromString)]
  public int table { get; set; }

}
