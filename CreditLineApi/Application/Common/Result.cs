namespace Application.Common;

public class Result
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public object Data { get; set; }
    // Constructor para el resultado exitoso
    public Result(bool success, string message, object? data = null)
    {
        Success = success;
        Message = message;
        Data = data!;
    }
    // Método estático para crear un resultado exitoso
    public static Result Ok(object? data = null)
    {
        return new Result(true, "Operación exitosa", data);
    }
    // Método estático para crear un resultado con error
    public static Result Failure(string message)
    {
        return new Result(false, message);
    }
}