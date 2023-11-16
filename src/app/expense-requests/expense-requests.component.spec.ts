import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseRequestsComponent } from './expense-requests.component';

describe('ExpenseRequestsComponent', () => {
  let component: ExpenseRequestsComponent;
  let fixture: ComponentFixture<ExpenseRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseRequestsComponent]
    });
    fixture = TestBed.createComponent(ExpenseRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
