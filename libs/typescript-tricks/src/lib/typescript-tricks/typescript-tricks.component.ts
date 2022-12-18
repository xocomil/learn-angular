import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ts-tricks-typescript-tricks',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>typescript-tricks works!</p> `,
  styleUrls: ['./typescript-tricks.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypescriptTricksComponent {}
