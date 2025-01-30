import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLineConsumptionComponent } from './credit-line-consumption.component';

describe('CreditLineConsumptionComponent', () => {
  let component: CreditLineConsumptionComponent;
  let fixture: ComponentFixture<CreditLineConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditLineConsumptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLineConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
