using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class GetActiveCreditLinesService : IGetActiveCreditLinesService
{
    private readonly ICreditLineRepository _creditLineRepository;
    public GetActiveCreditLinesService(ICreditLineRepository creditLineRepository)
    {
        _creditLineRepository = creditLineRepository;
    }
    public async Task<List<CreditLine>> GetActiveCreditLinesAsync()
    {
        // Obtener todas las líneas de crédito activas
        return await _creditLineRepository.GetActiveCreditLinesAsync();
    }
    public async Task<CreditLine?> GetCreditLinesByIdAsync(int id)
    {
        return await _creditLineRepository.GetByIdAsync(id);
    }

}