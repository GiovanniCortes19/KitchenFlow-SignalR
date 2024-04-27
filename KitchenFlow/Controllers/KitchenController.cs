using KitchenFlow.Contexts;
using KitchenFlow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KitchenFlow.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class KitchenController
    {
        private readonly DataContext _context;
        public KitchenController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Order> GetExistingOrders()
        {
            var orders = _context.Orders.Include(order => order.FoodItem).Where(order => order.OrderStatus != OrderStatus.Delivered);
            return orders.ToList();
        }
    }
}
