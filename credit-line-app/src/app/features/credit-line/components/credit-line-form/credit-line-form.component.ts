import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditLineService } from '../../services/credit-line.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-credit-line-form',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule ],
  templateUrl: './credit-line-form.component.html',
  styleUrls: ['./credit-line-form.component.css']
})
export class CreditLineFormComponent implements OnInit {
  creditLineForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private creditLineService: CreditLineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.creditLineForm = this.fb.group({
      customerName: ['', Validators.required],
      approvedAmount: [0, [Validators.required, Validators.min(1)]],
      usedAmount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.creditLineForm.invalid) return;

    const creditLine = this.creditLineForm.value;
    creditLine.availableAmount = creditLine.approvedAmount - creditLine.usedAmount;

    this.creditLineService.createCreditLine(creditLine).subscribe({
      next: () => this.router.navigate(['/credit-lines']),
      error: (err) => console.error('Error al crear la línea de crédito', err)
    });
  }
}
