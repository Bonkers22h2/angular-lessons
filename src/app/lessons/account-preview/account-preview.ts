import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccountService } from '../account';

@Component({
  selector: 'app-account-preview',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './account-preview.html',
  styleUrl: './account-preview.css',
})
export class AccountPreview implements OnInit {
  accounts: any[] = [];

  ownerName: string = '';
  accountType: string = '';
  initialBalance: number = 0;


  constructor(private accountService: AccountService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data;
      this.cdr.detectChanges();
    });
  }

  onSubmit() {
    const newAccount = {
      ownerName: this.ownerName,
      accountType: this.accountType,
      initialBalance: this.initialBalance
    };

    this.accountService.createAccount(newAccount).subscribe(() => {
      this.ownerName = '';
      this.accountType = 'SAVINGS';
      this.initialBalance = 0;
      this.loadAccounts();
    });
  }
}