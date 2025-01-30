using Application.Common;
using Domain.Entities;

namespace Application.Interfaces;

public interface IGetActiveCreditLinesService
{
    Task<List<CreditLine>> GetActiveCreditLinesAsync();
    Task<CreditLine?> GetCreditLinesByIdAsync(int id);
}
