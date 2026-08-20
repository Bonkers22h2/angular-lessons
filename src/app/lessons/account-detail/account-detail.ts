import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-account-detail',
  imports: [CommonModule],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.css',
})
export class AccountDetail implements OnInit {
  account: any = null;


  constructor(private route: ActivatedRoute, private accountService: AccountService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(){
    const accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';

    this.accountService.getAccount(accountNumber).subscribe(data => {
      this.account = data;
      this.cdr.detectChanges();
    })

  }


}
