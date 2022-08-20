import { createComponentFactory } from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [Store],
  });

  it('should create the app', () => {
    const spectator = createComponent();

    expect(spectator).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const spectator = createComponent();

    expect(spectator.fixture).toMatchSnapshot();
  });
});
