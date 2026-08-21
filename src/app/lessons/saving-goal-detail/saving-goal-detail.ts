import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SavingsGoalService } from '../savings-goal';

@Component({
  selector: 'app-saving-goal-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './saving-goal-detail.html',
  styleUrl: './saving-goal-detail.css',
})
export class SavingGoalDetail {
  savingGoal: any = null;
  accountNumber: string = '';
  goalName: string = '';
  targetAmount: number = 0;
  currentAmount: number = 0;
  contributeAmount: number = 0;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savingGoalService: SavingsGoalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';
    this.id = Number(this.route.snapshot.paramMap.get('id') ?? '');

    this.savingGoalService.getSavingGoal(this.accountNumber, this.id).subscribe(data => {
      this.savingGoal = data;
      this.goalName = data.goalName;
      this.targetAmount = data.targetAmount;
      this.currentAmount = data.currentAmount;
      this.cdr.detectChanges();
    });
  };

  loadSavingGoal() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';
    this.id = Number(this.route.snapshot.paramMap.get('id') ?? '');
    this.savingGoalService.getSavingGoal(this.accountNumber, this.id).subscribe(data => {
      this.savingGoal = data;
      this.cdr.detectChanges();
    })
  }

  getProgressPercent(goal: any): number {
    const current = Number(goal?.currentAmount ?? 0);
    const target = Number(goal?.targetAmount ?? 0);

    if (target <= 0) {
      return 0;
    }

    return Math.min(Math.round((current / target) * 100), 100);
  }

  getRemainingAmount(goal: any): number {
    const current = Number(goal?.currentAmount ?? 0);
    const target = Number(goal?.targetAmount ?? 0);
    return Math.max(target - current, 0);
  }

  contribute() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';
    this.id = Number(this.route.snapshot.paramMap.get('id') ?? '');
    const amount = Number(this.contributeAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      console.error('Contribution amount must be greater than 0');
      return;
    }

    this.savingGoalService.contribute(this.accountNumber, this.id, amount).subscribe({
      next: () => {
        this.contributeAmount = 0;
        this.loadSavingGoal();
      },
      error: (err) => {
        console.error('Contribution failed:', err.status, err.error?.message ?? err.message);
      }
    })
  }
}
