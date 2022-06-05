import { Component } from '@angular/core';

@Component({
  selector: 'learn-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learn-angular';

  todosList = [
    {
      done: false,
      description: 'learn angular',
    },
    { done: false, description: 'attend the Angular Community Meetup' },
  ];
}
