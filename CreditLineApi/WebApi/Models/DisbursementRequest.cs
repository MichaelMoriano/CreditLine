namespace WebApi.Models;

public class DisbursementRequest
{
    public int creditLineId { get; set; }
    public decimal amount { get; set; }
    public string? Currency { get; set; }
    public decimal ExchangeRate { get; set; }
}