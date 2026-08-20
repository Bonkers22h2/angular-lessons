import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BeneficiaryService } from '../beneficiary';

@Component({
  selector: 'app-beneficiary-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './beneficiary-detail.html',
  styleUrl: './beneficiary-detail.css',
})
export class BeneficiaryDetail implements OnInit{
  beneficiary: any = null;
  accountNumber = '';

  constructor(
    private route: ActivatedRoute,
    private beneficiaryService: BeneficiaryService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';
    const id = Number(this.route.snapshot.paramMap.get('id') ?? '');
    
    this.beneficiaryService.getBeneficiary(this.accountNumber, id).subscribe(data => {
      this.beneficiary = data;
      this.cdr.detectChanges();
    })
  }
  
}
