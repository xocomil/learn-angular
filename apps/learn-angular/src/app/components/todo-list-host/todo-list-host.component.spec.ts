import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListHostComponent } from './todo-list-host.component';

describe('TodoListHostComponent', () => {
  let component: TodoListHostComponent;
  let fixture: ComponentFixture<TodoListHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
