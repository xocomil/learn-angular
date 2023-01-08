import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AsConstComponent } from '../components/as-const/as-const.component';
import { ObservableFilterComponent } from '../components/observable-filter/observable-filter.component';

@Component({
  selector: 'ts-tricks-typescript-tricks',
  standalone: true,
  imports: [CommonModule, AsConstComponent, ObservableFilterComponent],
  template: `
    <ts-tricks-as-const></ts-tricks-as-const>
    <ts-tricks-observable-filter></ts-tricks-observable-filter>
  `,
  styleUrls: ['./typescript-tricks.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypescriptTricksComponent {}
