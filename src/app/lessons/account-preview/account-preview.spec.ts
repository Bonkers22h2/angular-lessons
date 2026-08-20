import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPreview } from './account-preview';

describe('AccountPreview', () => {
  let component: AccountPreview;
  let fixture: ComponentFixture<AccountPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
