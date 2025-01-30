import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CreditLineService } from '../../services/credit-line.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credit-line-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './credit-line-create.component.html',
  styleUrls: ['./credit-line-create.component.css']
})
export class CreditLineCreateComponent implements OnInit {
  creditLineForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private creditLineService: CreditLineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Crear el formulario reactivo
    this.creditLineForm = this.fb.group({
      customerName: ['', Validators.required],
      approvedAmount: [0, [Validators.required, Validators.min(1)]],
      currency: ['SOL', Validators.required] // SOL o USD
    });
  }

  onSubmit(): void {
    if (this.creditLineForm.invalid) return;

    const formData = this.creditLineForm.value;

    // Llamar al servicio para crear la nueva línea de crédito
    this.creditLineService.createCreditLine(formData).subscribe({
      next: (response) => {
        alert('Línea de crédito creada correctamente');
        this.router.navigate(['/credit-lines']); // Redirigir a la lista de líneas de crédito
      },
      error: (err) => {
        alert('Error al crear la línea de crédito');
      }
    });
  }

  onCancel(): void {
    // Limpiar el formulario
    this.creditLineForm.reset();

    // O redirigir a la lista de líneas de crédito
    this.router.navigate(['/credit-lines']);
  }
}
