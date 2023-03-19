import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MountConfig } from 'cypress/angular';
import { MockProvider } from 'ng-mocks';
import { TodoListStore } from '../todo.list.store';
import { TodoFooterComponent } from './todo-footer.component';

describe(TodoFooterComponent.name, () => {
  const componentConfig: () => MountConfig<TodoFooterComponent> = () => ({
    providers: [
      MockProvider(TodoListStore, { addToDo: cy.stub(), clearAll: cy.stub() }),
    ],
    imports: [BrowserAnimationsModule],
  });

  it('renders', () => {
    cy.mount(TodoFooterComponent, componentConfig());
  });

  it('should add a todo when entered and add button is clicked', () => {
    const addBtn = '[cy-data="add-todo-button"]' as const;
    const todoInput = '[cy-data="todo-input"]' as const;
    const testValue = 'test value';

    cy.mount(TodoFooterComponent, componentConfig());

    cy.get(addBtn).should('be.disabled');

    cy.get(todoInput).type(testValue, { force: true });

    cy.get(addBtn).should('be.enabled');

    cy.get(addBtn)
      .click()
      .then(() => {
        const todoListStore = TestBed.inject(TodoListStore);

        expect(todoListStore.addToDo).to.have.been.calledWith({
          description: testValue,
          done: false,
        });

        cy.get(addBtn).should('be.disabled');
        cy.get(todoInput).should('be.empty');
      });
  });

  it('should call clearAll on store when clicked', () => {
    const clearAllBtn = '[cy-data="clear-all-button"]' as const;

    cy.mount(TodoFooterComponent, componentConfig());

    cy.get(clearAllBtn)
      .click()
      .then(() => {
        const todoListStore = TestBed.inject(TodoListStore);

        expect(todoListStore.clearAll).to.have.been.calledOnce;
      });
  });
});
