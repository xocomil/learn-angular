import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MountConfig } from 'cypress/angular';
import { MockProvider } from 'ng-mocks';
import { TodoActions } from '../../+store/todos.actions';
import { NoTodoListComponent } from './no-todo-list.component';

describe(NoTodoListComponent.name, () => {
  const componentConfig: MountConfig<NoTodoListComponent> = {
    providers: [MockProvider(Store)],
  };

  it('renders', () => {
    cy.mount(NoTodoListComponent, componentConfig);
  });

  it('should have appropriate title', () => {
    cy.mount(NoTodoListComponent, componentConfig);

    cy.get('.mat-mdc-card-title').should(
      'have.text',
      `You don't have any Todo Lists`
    );
  });

  it('should dispatch todoListAdded action when button is clicked', () => {
    cy.mount(NoTodoListComponent, componentConfig).then(() => {
      const store = TestBed.inject(Store);

      cy.spy(store, 'dispatch');
    });

    cy.get('[data-cy=add-button]')
      .click()
      .then(() => {
        const store = TestBed.inject(Store);

        expect(store.dispatch).to.have.been.calledWith(
          TodoActions.todoListAdded()
        );
      });
  });
});
