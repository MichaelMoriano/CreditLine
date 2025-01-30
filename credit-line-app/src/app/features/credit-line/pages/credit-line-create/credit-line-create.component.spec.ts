import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLineCreateComponent } from './credit-line-create.component';

describe('CreditLineCreateComponent', () => {
  let component: CreditLineCreateComponent;
  let fixture: ComponentFixture<CreditLineCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditLineCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
