using Application.Comands;
using Application.Common;

namespace Application.Interfaces;

public interface ICreateCreditLineService
{
    Task<Result> HandleAsync(CreateCreditLineCommand command);
}
