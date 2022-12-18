import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsConstComponent } from './as-const.component';

describe('AsConstComponent', () => {
  let component: AsConstComponent;
  let fixture: ComponentFixture<AsConstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsConstComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsConstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
