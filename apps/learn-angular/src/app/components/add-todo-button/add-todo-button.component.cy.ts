import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { TodoActions } from '../../+store/todos.actions';
import { AddTodoButtonComponent } from './add-todo-button.component';

describe(AddTodoButtonComponent.name, () => {
  const componentOptions = {
    providers: [MockProvider(Store)],
  };

  it('renders', () => {
    cy.mount(AddTodoButtonComponent, componentOptions);
  });

  it('should dispatch todoListAdded action when button is clicked', () => {
    cy.mount(AddTodoButtonComponent, componentOptions).then(() => {
      const store = TestBed.inject(Store);

      cy.spy(store, 'dispatch').as('dispatch');
    });

    cy.get('button')
      .click()
      .then(() => {
        const store = TestBed.inject(Store);

        expect(store.dispatch).to.be.calledWith(TodoActions.todoListAdded());
      });
  });
});
