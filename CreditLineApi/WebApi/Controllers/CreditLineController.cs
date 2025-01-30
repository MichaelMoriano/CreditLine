namespace WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Application.Comands;
using Application.Interfaces;
using Application.Services;
using WebApi.Models;

[Route("api/[controller]")]
[ApiController]
public class CreditLineController : ControllerBase
{
    private readonly ICreateCreditLineService _createCreditLineService;
    private readonly IGetActiveCreditLinesService _getActiveCreditLinesService;
    private readonly IMakeDisbursementService _makeDisbursementService;

    public CreditLineController(ICreateCreditLineService createCreditLineService, IGetActiveCreditLinesService getActiveCreditLinesService, IMakeDisbursementService makeDisbursementService)
    {
        _createCreditLineService = createCreditLineService;
        _getActiveCreditLinesService = getActiveCreditLinesService;
        _makeDisbursementService = makeDisbursementService;
    }
    // POST: api/CreditLine
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCreditLineCommand command)
    {
        if (command == null)
            return BadRequest("Invalid data");
        var result = await _createCreditLineService.HandleAsync(command);
        if (result.Success)
            return Ok(result.Data); // Devolver la línea de crédito creada
        else
            return BadRequest(result.Message);
    }

    // GET: api/CreditLine
    [HttpGet("active")]
    public async Task<IActionResult> GetActiveCreditLines()
    {
        var result = await _getActiveCreditLinesService.GetActiveCreditLinesAsync();
        return Ok(result);
    }

    [HttpGet("detail/{Id}")]
    public async Task<IActionResult> GetCreditLinesById(int Id)
    {
        if (Id == 0)
            return BadRequest("Invalid data");
        var result = await _getActiveCreditLinesService.GetCreditLinesByIdAsync(Id);
        return Ok(result);
    }

    // POST: api/CreditLine/Disburse
    [HttpPost("Disburse")]
    public async Task<IActionResult> MakeDisbursement([FromBody] DisbursementRequest request)
    {   
        if (request == null)
        {
            Console.WriteLine("Solicitud nula recibida.");
            return BadRequest("Datos inválidos.");
        }

        //Console.WriteLine($"Recibido: CreditLineId={request.creditLineId}, Amount={request.amount}, Currency={request.Currency}, ExchangeRate={request.ExchangeRate}");

        //Console.WriteLine("Ingreso");
        var result = await _makeDisbursementService.HandleAsync(request.creditLineId, request.amount, request.Currency!, request.ExchangeRate);
        if (result.Success)
        {
            //Console.WriteLine("Correcto");
            return Ok(result.Data); // Devolver el desembolso realizado
        }
        else
        {
            //Console.WriteLine("Error");
            return BadRequest(result.Message); // Devolver mensaje de error
        }
            
    }
}