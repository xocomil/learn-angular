import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxChange as MatCheckboxChange, MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { TodoListItem } from '../../../models/todo-list-item';

@Component({
  selector: 'learn-angular-todo-list',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule, MatButtonModule],
  template: `
    <section>
      <div *ngFor="let todo of todosList; let i = index">
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
  #todosList: TodoListItem[] = [];
  @Input() get todosList(): TodoListItem[] {
    return this.#todosList;
  }

  set todosList(value: TodoListItem[] | undefined) {
    this.#todosList = value ?? [];
  }

  @Output() itemCheckedChanged = new EventEmitter<{ arrayIndex: number; checked: boolean }>();
  @Output() itemDeleted = new EventEmitter<{ arrayIndex: number }>();

  checkedStateChanged(checkboxChange: MatCheckboxChange, arrayIndex: number): void {
    this.itemCheckedChanged.emit({ arrayIndex, checked: checkboxChange.checked });
  }

  deleteItem(arrayIndex: number): void {
    this.itemDeleted.emit({ arrayIndex });
  }
}
