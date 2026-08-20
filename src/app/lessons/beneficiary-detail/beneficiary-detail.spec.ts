import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryDetail } from './beneficiary-detail';

describe('BeneficiaryDetail', () => {
  let component: BeneficiaryDetail;
  let fixture: ComponentFixture<BeneficiaryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficiaryDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
