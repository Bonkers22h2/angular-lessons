import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsGoalService } from '../savings-goal';

@Component({
  selector: 'app-saving-goal-detail',
  imports: [],
  templateUrl: './saving-goal-detail.html',
  styleUrl: './saving-goal-detail.css',
})
export class SavingGoalDetail {
  savingGoal: any = null;
  accountNumber: string = '';
  goalName: string = '';
  targetAmount: number = 0;
  currentAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savingGoalService: SavingsGoalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber') ?? '';
    const id = Number(this.route.snapshot.paramMap.get('id') ?? '');

    this.savingGoalService.getSavingGoal(this.accountNumber, id).subscribe(data => {
      this.savingGoal = data;
      this.goalName = data.goalName;
      this.targetAmount = data.targetAmount;
      this.currentAmount = data.currentAmount;
      this.cdr.detectChanges();
    });
  };
}
