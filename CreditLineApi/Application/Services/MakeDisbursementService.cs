using Application.Common;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class MakeDisbursementService : IMakeDisbursementService
{
    private readonly ICreditLineRepository _creditLineRepository;
    private readonly IDisbursementRepository _disbursementRepository;
    public MakeDisbursementService(ICreditLineRepository creditLineRepository, IDisbursementRepository disbursementRepository)
    {
        _creditLineRepository = creditLineRepository;
        _disbursementRepository = disbursementRepository;
    }
    public async Task<Result> HandleAsync(int creditLineId, decimal amount, string currency, decimal exchangeRate = 1)
    {
        // Obtener la línea de crédito
        var creditLine = await _creditLineRepository.GetByIdAsync(creditLineId);
        var Amountb = new decimal();
        if (creditLine == null)
            return Result.Failure("La línea de crédito no existe.");
        // Verificar si hay suficiente saldo disponible
        if (creditLine.AvailableAmount < amount)
            return Result.Failure("Saldo insuficiente para el desembolso.");
        // Si el desembolso es en otra moneda, aplicar tipo de cambio
        if (currency != creditLine.Currency)
        {
            Amountb = amount * exchangeRate; // Convertir la cantidad al valor equivalente en la moneda de la línea de crédito
        }
        // Crear el desembolso
        var disbursement = new Disbursement
        {
            CreditLineId = creditLine.Id,
            Amount = Amountb,
            Currency = creditLine.Currency,
            ExchangeRate = exchangeRate,
            Date = DateTime.UtcNow
        };
        // Guardar el desembolso y actualizar la línea de crédito
        //await _disbursementRepository.AddAsync(disbursement);
        creditLine.AvailableAmount -= amount; // Actualizar el saldo disponible
        await _creditLineRepository.UpdateAsync(creditLine);
        return Result.Ok(disbursement);
    }
}
