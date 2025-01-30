using Domain.Entities;

namespace Domain.Interfaces;

public interface IDisbursementRepository
{
    // Serviría para poder hacer el grabado del desembolso a mayor detalle
    Task AddAsync(Disbursement disbursement);
}