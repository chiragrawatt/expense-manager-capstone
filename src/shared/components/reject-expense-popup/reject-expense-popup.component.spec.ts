import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectExpensePopupComponent } from './reject-expense-popup.component';

describe('RejectExpensePopupComponent', () => {
  let component: RejectExpensePopupComponent;
  let fixture: ComponentFixture<RejectExpensePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectExpensePopupComponent]
    });
    fixture = TestBed.createComponent(RejectExpensePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
