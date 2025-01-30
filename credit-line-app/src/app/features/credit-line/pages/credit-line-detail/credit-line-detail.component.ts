import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreditLineService, CreditLine } from '../../services/credit-line.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-credit-line-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './credit-line-detail.component.html',
  styleUrls: ['./credit-line-detail.component.css']
})
export class CreditLineDetailComponent implements OnInit {
  creditLine?: CreditLine;

  constructor(
    private route: ActivatedRoute,
    private creditLineService: CreditLineService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('ID no válido:', id);
      return;
    }
    this.creditLineService.getCreditLinesById(id).subscribe(data => {
      this.creditLine = data;
    });
  }
}
