import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingGoalDetail } from './saving-goal-detail';

describe('SavingGoalDetail', () => {
  let component: SavingGoalDetail;
  let fixture: ComponentFixture<SavingGoalDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingGoalDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SavingGoalDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
