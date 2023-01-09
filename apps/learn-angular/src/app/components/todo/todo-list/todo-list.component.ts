import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { PushModule } from '@ngrx/component';
import { TodoListStore } from '../todo.list.store';

@Component({
  selector: 'learn-angular-todo-list',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule, MatButtonModule, PushModule],
  template: `
    <section>
      <div *ngFor="let todo of items$ | ngrxPush; let i = index">
        <mat-checkbox [ngModel]="todo.done" (change)="checkedStateChanged($event, i)">
          {{ todo.description }}
          <button class="delete-btn" (click)="deleteItem(i)" mat-button>X</button>
        </mat-checkbox>
      </div>
    </section>
  `,
  styleUrls: ['./todo-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  #todoListStore = inject(TodoListStore);

  protected readonly items$ = this.#todoListStore.items$;

  checkedStateChanged(checkboxChange: MatCheckboxChange, arrayIndex: number): void {
    this.#todoListStore.itemChecked({ arrayIndex, checked: checkboxChange.checked });
  }

  deleteItem(arrayIndex: number): void {
    this.#todoListStore.itemDeleted(arrayIndex);
  }
}
