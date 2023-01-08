import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptTricksComponent } from './typescript-tricks.component';

describe('TypescriptTricksComponent', () => {
  let component: TypescriptTricksComponent;
  let fixture: ComponentFixture<TypescriptTricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypescriptTricksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypescriptTricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
