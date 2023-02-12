import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'learn-angular-no-todo-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title> You don't have any Todo Lists </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>It appears that you don't have any Todo Lists. This could be because it is your first or because you deleted them all.</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button><mat-icon fontIcon="add"></mat-icon> Add a new Todo List.</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./no-todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoTodoListComponent {}
