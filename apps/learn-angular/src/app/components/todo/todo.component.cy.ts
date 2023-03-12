import { TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';

describe(TodoComponent.name, () => {

  beforeEach(() => {
    TestBed.overrideComponent(TodoComponent, {
      add: { 
        imports: [],
        providers: []
      }
    }) 
  })

  it('renders', () => {
     cy.mount(TodoComponent, {
           componentProperties: {
               todoListId:  '',
          }
       });
  })

})
