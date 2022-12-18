import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AsConstComponent } from '../components/as-const/as-const.component';

@Component({
  selector: 'ts-tricks-typescript-tricks',
  standalone: true,
  imports: [CommonModule, AsConstComponent],
  template: ` <ts-tricks-as-const></ts-tricks-as-const> `,
  styleUrls: ['./typescript-tricks.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypescriptTricksComponent {}
