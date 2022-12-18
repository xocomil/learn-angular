import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  standalone: true,
  selector: 'learn-angular-root',
  template: `
    <div class="main-display">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [TodoComponent, RouterOutlet],
})
export class AppComponent {
  title = 'learn-angular';
}
