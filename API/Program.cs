using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();


builder.Services.AddAppServices(builder.Configuration);

builder.Services.AddJWTService(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization(); 

app.MapControllers();

app.Run();