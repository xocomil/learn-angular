import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PushModule } from '@ngrx/component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListStore } from './todo.list.store';

@Component({
  selector: 'learn-angular-todo[todoListId]',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TodoListComponent,
    PushModule,
    TodoFooterComponent,
  ],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>
          <span *ngIf="!(editTitle$ | ngrxPush); else editTitleTemplate">
            {{ title$ | ngrxPush }}
          </span>
          <button (click)="editTitle()" type="button" mat-raised-button>
            <mat-icon [fontIcon]="(editTitleIcon$ | ngrxPush) ?? 'edit'"></mat-icon>
          </button>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <learn-angular-todo-list />
      </mat-card-content>
      <mat-card-footer>
        <learn-angular-todo-footer />
      </mat-card-footer>
    </mat-card>

    <ng-template #editTitleTemplate>
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input [ngModel]="title$ | ngrxPush" [ngModelOptions]="{ updateOn: 'blur' }" (ngModelChange)="titleChanged($event)" matInput />
      </mat-form-field>
    </ng-template>
  `,
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoListStore],
})
export class TodoComponent {
  #todoListStore = inject(TodoListStore);

  protected todoList$ = this.#todoListStore.todoList$;
  protected editTitle$ = this.#todoListStore.editTitle$;
  protected editTitleIcon$ = this.#todoListStore.editTitleIcon$;

  #todoListId = -1;
  @Input() get todoListId(): number {
    return this.#todoListId;
  }

  set todoListId(value: number) {
    this.#todoListId = value;

    this.#todoListStore.setId(value);
  }

  protected readonly title$ = this.#todoListStore.title$;

  editTitle() {
    this.#todoListStore.toggleEditTitle();
  }

  titleChanged(newTitle: string) {
    this.#todoListStore.setTitle(newTitle);
  }
}
