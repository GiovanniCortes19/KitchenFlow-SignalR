using System.Text.Json.Serialization;
using KitchenFlow;
using KitchenFlow.Contexts;
using KitchenFlow.Workers;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

/* Services */
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQLite to manage data
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite("Data Source=mydatabase.sqlite"));

// Add the seeding worker
builder.Services.AddHostedService<SeedingWorker>();

// Configure pipeline to accept enums as strings, instead of just numbers
builder.Services.AddMvc().AddJsonOptions(x =>
{
  x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Add SignalR
builder.Services.AddSignalR();

var app = builder.Build();

/* Middleware */

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();

/* SignalR Hub Route */
app.MapHub<FoodHub>("/foodhub");

app.Run();