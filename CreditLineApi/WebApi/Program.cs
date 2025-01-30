using Application.Comands;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ICreditLineRepository, CreditLineRepository>();
builder.Services.AddScoped<IDisbursementRepository, DisbursementRepository>();

// Registrar GetActiveCreditLinesService
builder.Services.AddScoped<IGetActiveCreditLinesService, GetActiveCreditLinesService>();
builder.Services.AddScoped<IMakeDisbursementService, MakeDisbursementService>();
builder.Services.AddScoped<ICreateCreditLineService, CreateCreditLineService>();

// Registra MediatR para usar los Command Handlers
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CreateCreditLineCommandHandler>());

// Registrar servicios
builder.Services.AddScoped<IRequestHandler<CreateCreditLineCommand, CreditLine>, CreateCreditLineCommandHandler>();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Dirección donde corre Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Registra ApplicationDbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

app.UseCors("AllowAngularLocalhost");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
