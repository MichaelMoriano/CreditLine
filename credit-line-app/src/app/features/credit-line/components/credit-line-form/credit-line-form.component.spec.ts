import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLineFormComponent } from './credit-line-form.component';

describe('CreditLineFormComponent', () => {
  let component: CreditLineFormComponent;
  let fixture: ComponentFixture<CreditLineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditLineFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
