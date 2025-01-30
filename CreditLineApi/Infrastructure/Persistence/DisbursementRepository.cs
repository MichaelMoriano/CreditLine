using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Persistence;

public class DisbursementRepository : IDisbursementRepository
{
    private readonly ApplicationDbContext _context;
    public DisbursementRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    //Serviría para poder hacer el grabado del desembolso a mayor detalle con la conexión a BD
    public async Task AddAsync(Disbursement disbursement)
    {
        _context.Disbursements.Add(disbursement);
        await _context.SaveChangesAsync();
    }
}