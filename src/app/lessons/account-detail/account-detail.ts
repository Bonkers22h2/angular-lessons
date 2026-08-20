import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { BeneficiaryService } from '../beneficiary';

@Component({
  selector: 'app-account-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.css',
})
export class AccountDetail implements OnInit {
  nickname: string = '';
  beneficiaryAccountNumber: string = '';
  beneficiaries: any[] = [];
  account: any = null;
  withdrawAmount: number = 0;
  depositAmount: number = 0;
  accountNumber: string = '';
  transferAmount: number = 0;
  toAccountNumber: string = '';


  constructor(private route: ActivatedRoute, private accountService: AccountService, private beneficiaryService: BeneficiaryService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';

    this.accountService.getAccount(this.accountNumber).subscribe(data => {
      this.account = data;
      this.loadBeneficiaries();
      this.cdr.detectChanges();
    })
  }

  createBeneficiary() {
    const newBeneficiary = {
      nickname: this.nickname,
      beneficiaryAccountNumber: this.beneficiaryAccountNumber
    };

    this.beneficiaryService.createBeneficiary(this.accountNumber, newBeneficiary).subscribe(() => {
      this.nickname = '';
      this.beneficiaryAccountNumber = '';
      this.loadBeneficiaries();
    });
  }

  loadAccount() {
    const accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';
    this.accountService.getAccount(accountNumber).subscribe(data => {
      this.account = data;
      this.cdr.detectChanges();
    });
  }

  loadBeneficiaries() {
    this.beneficiaryService.getBeneficiaries(this.accountNumber).subscribe(data => {
      this.beneficiaries = data;
      this.cdr.detectChanges();
    })
  }

  withdraw() {
    this.accountService.withdraw(this.accountNumber, this.withdrawAmount).subscribe({
      next: () => {
        this.withdrawAmount = 0;
        this.loadAccount();
      },
      error: (err) => {
        console.error('Withdraw failed:', err.error?.message);
      }
    });
  }

  deposit() {
    this.accountService.deposit(this.accountNumber, this.depositAmount).subscribe({
      next: () => {
        this.depositAmount = 0;
        this.loadAccount();
      },
      error: (err) => {
        console.error('Deposit failed:', err.error?.message);
      }
    })
  }

  transfer() {
    this.accountService.transfer(this.accountNumber, this.toAccountNumber, this.transferAmount).subscribe({
      next: () => {
        this.toAccountNumber = '';
        this.transferAmount = 0;
        this.loadAccount();
      },
      error: (err) => {
        console.error('Trasnfer failed:', err.error?.message);
      }
    })
  }

  closeAccount() {
    this.accountService.closeAccount(this.accountNumber).subscribe({
      next: () => {
        this.loadAccount();
      },
      error: (err) => {
        console.error('Closed account failed:', err.error?.message);
      }
    })
  }

  activateAccount() {
    this.accountService.activateAccount(this.accountNumber).subscribe({
      next: () => {
        this.loadAccount();
      },
      error: (err) => {
        console.error('Activate account failed:', err.error?.message);
      }
    })
  }


}
