import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreditLineService, CreditLine } from '../../services/credit-line.service';

@Component({
  selector: 'app-credit-line-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './credit-line-list.component.html',
  styleUrls: ['./credit-line-list.component.css']
})
export class CreditLineListComponent implements OnInit {
  creditLines: CreditLine[] = [];

  constructor(private creditLineService: CreditLineService) {}

  ngOnInit(): void {
    this.creditLineService.getCreditLines().subscribe(data => {
      this.creditLines = data;
    });
  }

  getCurrencyLabel(currency: string): string {
    return currency === 'USD' ? 'Dólares ($)' : 'Soles (S/)';
  }
}
