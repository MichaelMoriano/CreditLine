using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Comands;

public class CreateCreditLineCommand : IRequest<CreditLine>
{
    public string? CustomerName { get; set; }
    public decimal ApprovedAmount { get; set; }
    public string? Currency { get; set; } // Ejemplo: 'USD' o 'S/.' (Soles)

}

public class CreateCreditLineCommandHandler : IRequestHandler<CreateCreditLineCommand, CreditLine>
{
    private readonly ICreditLineRepository _creditLineRepository;
    public CreateCreditLineCommandHandler(ICreditLineRepository creditLineRepository)
    {
        _creditLineRepository = creditLineRepository;
    }
    public async Task<CreditLine> Handle(CreateCreditLineCommand request, CancellationToken cancellationToken)
    {
        // Validación (por ejemplo, verificar si el cliente ya tiene una línea de crédito activa)
        var creditLine = new CreditLine
        {
            CustomerName = request.CustomerName,
            ApprovedAmount = request.ApprovedAmount,
            Currency = request.Currency,
            AvailableAmount = request.ApprovedAmount, // Suponiendo que el crédito es igual al monto disponible
            IsActive = true
        };
        await _creditLineRepository.AddAsync(creditLine);
        return creditLine;
    }
}