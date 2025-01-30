# CreditLine
Proyecto de linea de crédito

Comando para clonar

git clone https://github.com/MichaelMoriano/CreditLine

Backend: CreditLineApi
Comandos para levantar el backend(es necesario tener .net 7.0): 

dotnet build
dotnet run --project .\WebApi\WebApi.csproj

Frontend: credit-line-app
Tener instalado con anterioridad Node.js en su última versión
Tener instalado angular o ejectuar en CMD dentro de la carpeta: npm install -g @angular/cli
Para ejecutar el proyecto: ng serve

Si sale error al levantar el front, ejecutar:
# Actualiza las dependencias en el proyecto
npm install @angular/core@latest @angular/cli@latest

# Actualiza Vite, es necesario
npm install vite@latest
