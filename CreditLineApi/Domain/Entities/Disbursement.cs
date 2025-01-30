namespace Domain.Entities;

public class Disbursement
{
    public int Id { get; set; }
    public int CreditLineId { get; set; } // Relacionado con la línea de crédito
    public decimal Amount { get; set; } // Monto del desembolso
    public string? Currency { get; set; } // 'USD' o 'S/.'
    public decimal ExchangeRate { get; set; } // Tipo de cambio (solo si aplica)
    public DateTime Date { get; set; } // Fecha del desembolso
}