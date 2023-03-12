import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MountConfig } from 'cypress/angular';
import { MockProvider } from 'ng-mocks';
import { TodoListStore } from '../todo.list.store';
import { TodoFooterComponent } from './todo-footer.component';

describe(TodoFooterComponent.name, () => {
  const componentConfig: MountConfig<TodoFooterComponent> = {
    providers: [MockProvider(TodoListStore)],
    imports: [BrowserAnimationsModule],
  };

  it('renders', () => {
    cy.mount(TodoFooterComponent, componentConfig);
  });

  it('should enable the add button if a todo is entered', () => {
    const addBtn = '[cy-data="add-todo-button"]' as const;

    cy.mount(TodoFooterComponent, componentConfig);

    cy.get(addBtn).should('be.disabled');

    cy.get('[cy-data="todo-input"]').type('new todo', { force: true });

    cy.get(addBtn).should('be.enabled');

    // cy.get(addBtn).click();
    //   .then(() => {
    //     console.log('clicked add button');
    //   });
  });
});
