import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableFilterComponent } from './observable-filter.component';

describe('ObservableFilterComponent', () => {
  let component: ObservableFilterComponent;
  let fixture: ComponentFixture<ObservableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
