using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class CreditLineRepository : ICreditLineRepository
{
    private static List<CreditLine> _creditLines = new List<CreditLine>();
    private readonly ApplicationDbContext _context;
    public CreditLineRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public Task AddAsync(CreditLine creditLine)
    {
        creditLine.Id = _creditLines.Count == 0 ? 1 : _creditLines.Last().Id + 1;
        _creditLines.Add(creditLine);
        return Task.CompletedTask;
    }
    public async Task<CreditLine?> GetByIdAsync(int id)
    {
        var creditLine = _creditLines.Find(x => x.Id == id);
        return await Task.FromResult(creditLine);
    }
    public List<CreditLine> GetAllAsync()
    {
        return _creditLines;
    }

    public async Task<List<CreditLine>> GetActiveCreditLinesAsync()
    {
         // Aquí puedes filtrar las líneas de crédito activas si es necesario
        return await Task.FromResult(_creditLines.Where(c => c.IsActive).ToList());
    }

    public Task UpdateAsync(CreditLine creditLine)
    {
        
        _creditLines.Where(x => x.Id == creditLine.Id).Select(s => 
        {
            s.AvailableAmount = creditLine.AvailableAmount; 
            return s;
        }
        ).ToList();
        return Task.CompletedTask;
    }
}
