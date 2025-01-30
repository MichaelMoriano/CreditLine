using Domain.Entities;

namespace Domain.Interfaces;

public interface ICreditLineRepository
{
    Task AddAsync(CreditLine creditLine);
    Task<CreditLine?> GetByIdAsync(int id);
    List<CreditLine> GetAllAsync();
    Task<List<CreditLine>> GetActiveCreditLinesAsync();
    Task UpdateAsync(CreditLine creditLine);
}
