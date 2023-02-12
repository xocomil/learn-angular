import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTodoListComponent } from './no-todo-list.component';

describe('NoTodoListComponent', () => {
  let component: NoTodoListComponent;
  let fixture: ComponentFixture<NoTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoTodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
