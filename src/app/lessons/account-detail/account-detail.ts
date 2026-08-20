import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-account-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.css',
})
export class AccountDetail implements OnInit {
  account: any = null;
  amount: number = 0;
  accountNumber: string = '';


  constructor(private route: ActivatedRoute, private accountService: AccountService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';

    this.accountService.getAccount(this.accountNumber).subscribe(data => {
      this.account = data;
      this.cdr.detectChanges();
    })
  }

  loadAccount() {
    const accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';
    this.accountService.getAccount(accountNumber).subscribe(data => {
      this.account = data;
      this.cdr.detectChanges();
    });
  }
  withdraw() {
    this.accountService.withdraw(this.accountNumber, this.amount).subscribe({
      next: () => {
        this.amount = 0;
        this.loadAccount();
      },
      error: (err) => {
        console.error('Withdraw failed:', err.error?.message);
      }
    });
  }


}
