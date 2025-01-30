namespace Domain.Entities;

public class CreditLine
{
    public int Id { get; set; }
    public string? CustomerName { get; set; }
    public decimal ApprovedAmount { get; set; }
    public string? Currency { get; set; }
    public decimal AvailableAmount { get; set; } // El monto disponible para consumir
    public bool IsActive { get; set; }
}
