using Application.Common;

namespace Application.Interfaces;

public interface IMakeDisbursementService
{
    Task<Result> HandleAsync(int creditLineId, decimal amount, string currency, decimal exchangeRate);
}
