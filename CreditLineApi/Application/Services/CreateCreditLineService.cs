using Application.Comands;
using Application.Common;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class CreateCreditLineService : ICreateCreditLineService
{
    private readonly ICreditLineRepository _creditLineRepository;
    public CreateCreditLineService(ICreditLineRepository creditLineRepository)
    {
        _creditLineRepository = creditLineRepository;
    }
    public async Task<Result> HandleAsync(CreateCreditLineCommand command)
    {
        // Lógica de negocio para crear la línea de crédito
        var creditLine = new CreditLine
        {
            CustomerName = command.CustomerName,
            ApprovedAmount = command.ApprovedAmount,
            Currency = command.Currency,
            IsActive = true,
            AvailableAmount = command.ApprovedAmount
        };
        // Guardar en la base de datos
        await _creditLineRepository.AddAsync(creditLine);
        return new Result(true, "", creditLine);
    }
}
