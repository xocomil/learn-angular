import { TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';

describe(TodoListComponent.name, () => {

  beforeEach(() => {
    TestBed.overrideComponent(TodoListComponent, {
      add: { 
        imports: [],
        providers: []
      }
    }) 
  })

  it('renders', () => {
     cy.mount(TodoListComponent,);
  })

})
