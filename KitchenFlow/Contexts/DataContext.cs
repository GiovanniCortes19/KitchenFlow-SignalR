// Entity Framework
using Microsoft.EntityFrameworkCore;
using KitchenFlow.Models;

namespace KitchenFlow.Contexts;

public class DataContext : DbContext
{
  public DataContext(DbContextOptions<DataContext> options) : base(options)
  {

  }

  public DbSet<FoodItem> FoodItems { get; set; }
  public DbSet<Order> Orders { get; set; }

}
