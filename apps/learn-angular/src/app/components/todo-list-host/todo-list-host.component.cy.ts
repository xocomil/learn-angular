import { TestBed } from '@angular/core/testing';
import { TodoListHostComponent } from './todo-list-host.component';

describe(TodoListHostComponent.name, () => {

  beforeEach(() => {
    TestBed.overrideComponent(TodoListHostComponent, {
      add: { 
        imports: [],
        providers: []
      }
    }) 
  })

  it('renders', () => {
     cy.mount(TodoListHostComponent,);
  })

})
