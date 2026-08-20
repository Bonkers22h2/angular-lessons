import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BeneficiaryService } from '../beneficiary';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beneficiary-detail',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './beneficiary-detail.html',
  styleUrl: './beneficiary-detail.css',
})
export class BeneficiaryDetail implements OnInit {
  beneficiary: any = null;
  accountNumber = '';
  nickname: string = '';
  beneficiaryAccountNumber: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private beneficiaryService: BeneficiaryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';
    const id = Number(this.route.snapshot.paramMap.get('id') ?? '');

    this.beneficiaryService.getBeneficiary(this.accountNumber, id).subscribe(data => {
      this.beneficiary = data;
      this.cdr.detectChanges();
    });
  };

  updateBeneficiary() {
    const updatedBeneficiary = {
      nickname: this.nickname,
      beneficiaryAccountNumber: this.beneficiaryAccountNumber
    };

    this.beneficiaryService.updateBeneficiary(this.accountNumber, this.beneficiary.id, updatedBeneficiary).subscribe(() => {
      // Update the local beneficiary object with the new values
      this.beneficiary.nickname = this.nickname;
      this.beneficiary.beneficiaryAccountNumber = this.beneficiaryAccountNumber;
      // Clear the input fields after successful update
      this.nickname = '';
      this.beneficiaryAccountNumber = '';
      this.cdr.detectChanges();
    });
  }
  deleteBeneficiary() {
    this.beneficiaryService.deleteBeneficiary(this.accountNumber, this.beneficiary.id).subscribe(() => {
      this.router.navigate(['/accounts', this.accountNumber]);
    });
  }
}