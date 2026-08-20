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
  feedback = '';
  error = '';

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
      this.nickname = data.nickname;
      this.beneficiaryAccountNumber = data.beneficiaryAccountNumber;
      this.cdr.detectChanges();
    });
  };

  updateBeneficiary() {
    const updatedBeneficiary = {
      nickname: this.nickname,
      beneficiaryAccountNumber: this.beneficiaryAccountNumber
    };

    this.beneficiaryService.updateBeneficiary(this.accountNumber, this.beneficiary.id, updatedBeneficiary).subscribe(() => {
      this.beneficiary.nickname = this.nickname;
      this.beneficiary.beneficiaryAccountNumber = this.beneficiaryAccountNumber;
      this.feedback = 'Beneficiary updated successfully.';
      this.error = '';
      this.cdr.detectChanges();
    }, () => {
      this.error = 'We could not update this beneficiary. Please try again.';
      this.feedback = '';
    });
  }
  deleteBeneficiary() {
    this.beneficiaryService.deleteBeneficiary(this.accountNumber, this.beneficiary.id).subscribe(() => {
      this.router.navigate(['/accounts', this.accountNumber]);
    }, () => {
      this.error = 'We could not delete this beneficiary. Please try again.';
      this.feedback = '';
    });
  }
}