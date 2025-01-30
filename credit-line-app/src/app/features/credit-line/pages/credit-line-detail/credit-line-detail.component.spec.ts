import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLineDetailComponent } from './credit-line-detail.component';

describe('CreditLineDetailComponent', () => {
  let component: CreditLineDetailComponent;
  let fixture: ComponentFixture<CreditLineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditLineDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
