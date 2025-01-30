import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeService } from '../../services/currency-exchange.service';
import { CreditLineService } from '../../services/credit-line.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-credit-line-consumption',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './credit-line-consumption.component.html',
  styleUrls: ['./credit-line-consumption.component.css']
})
export class CreditLineConsumptionComponent implements OnInit {
  creditLine: any;
  creditLineForm!: FormGroup;
  exchangeRate: number = 0;
  exchangeRatePEN: number = 0; 
  exchangeRateUSD: number = 0; 
  convertedAmount: number = 0;
  currencySymbol: string = 'S/';
  totalAmount: number = 0; // Monto total actualizado en tiempo real

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private route: ActivatedRoute,
    private creditLineService: CreditLineService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    // Cargar el tipo de cambio al inicio
    this.currencyExchangeService.getExchangeRatePEN().subscribe((data: { conversion_rates: { PEN: number; }; }) => {
      this.exchangeRatePEN = data.conversion_rates.PEN; 
      //this.exchangeRatePEN = 0.27; 
      this.cdr.detectChanges();
    });

    this.currencyExchangeService.getExchangeRateUSD().subscribe((data: { conversion_rates: { USD: number; }; }) => {
      this.exchangeRateUSD = data.conversion_rates.USD; 
      //this.exchangeRateUSD = 3.74; 
      this.cdr.detectChanges(); 
    });
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('ID no válido:', id);
      return;
    }

    this.creditLineService.getCreditLinesById(id).subscribe((data) => {
      this.creditLine = data;
      this.updateExchangeRate();
      this.cdr.detectChanges();
    });

    // Formulario de desembolso
    this.creditLineForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      currency: ['SOL', Validators.required], 
    });

    // Suscribirse a cambios en el formulario para recalcular automáticamente
    this.creditLineForm.valueChanges.subscribe(() => {
      this.updateExchangeRate();
      this.calculateTotal();
    });
  }

  updateExchangeRate(): void {
    if (!this.creditLine) return;
  
    const selectedCurrency = this.creditLineForm.value.currency;
    if(this.creditLine.currency !== selectedCurrency)
    {
        this.exchangeRate = selectedCurrency === 'USD' ? this.exchangeRateUSD : this.exchangeRatePEN ;
    }
      else
    { 
        this.exchangeRate = 1
    }

    this.cdr.detectChanges(); // Forzar la actualización en la vista
  }

  onSubmit(): void {
    if (this.creditLineForm.invalid) return;

    let amount = this.creditLineForm.value.amount;
    let amountB = this.creditLineForm.value.amount;
    const currency = this.creditLineForm.value.currency;

    if (amount > this.creditLine.availableAmount) {
      alert('El monto solicitado excede el saldo disponible.');
      return;
    }
    this.creditLine.usedAmount = this.creditLine.approvedAmount - this.creditLine.availableAmount
    // Actualizar la línea de crédito
    this.creditLine.usedAmount += amount;
    this.creditLine.availableAmount -= amount;

    this.creditLineService.makeDisbursement(this.creditLine.id, amountB, currency, this.exchangeRate).subscribe({
      next: () => alert('Desembolso realizado correctamente'),
      error: (err) => {
        console.error('Error en la solicitud:', err);
        alert('Error al realizar el desembolso: ' + (err.error?.message || err.message));
      }
    });
  }

  getCurrencyLabel(currency: string): string {
    return currency === 'USD' ? 'Dólares ($)' : 'Soles (S/)';
  }

  calculateTotal(): void {
    this.updateExchangeRate(); // Asegurar que usamos el tipo de cambio correcto

    let amount = this.creditLineForm.value.amount || 0;

    this.totalAmount = amount * this.exchangeRate;
    // Convertir a soles si la moneda es USD
    this.cdr.detectChanges();
  }
  // calculateTotal(): void {
  //   if (!this.creditLine || !this.creditLineForm.value) return;
  
  //   let amount = this.creditLineForm.value.amount || 0;
  //   const selectedCurrency = this.creditLineForm.value.currency;
  //   const creditLineCurrency = this.creditLine.currency; // Moneda de la línea de crédito
  
  //   // Verificar si se requiere conversión
  //   if (creditLineCurrency === 'PEN' && selectedCurrency === 'USD') {
  //     // Convertir de soles a dólares
  //     this.totalAmount = amount / this.exchangeRateUSD;
  //   } else if (creditLineCurrency === 'USD' && selectedCurrency === 'PEN') {
  //     // Convertir de dólares a soles
  //     this.totalAmount = amount * this.exchangeRateUSD;
  //   } else {
  //     // No hay conversión, se mantiene el mismo valor
  //     this.totalAmount = amount;
  //   }
  
  //   this.cdr.detectChanges(); // Forzar actualización en la vista
  // }

}