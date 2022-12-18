import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

// enum
// enum Fruit {
//   Apple = 'Apple',
//   Pear = 'Pear',
//   Orange = 'Orange',
// }
//
// const getFruitName = (fruit: Fruit): string => {
//   return Fruit[fruit];
// };
//
// console.log(getFruitName(Fruit.Apple)); // Apple

// const enum
// const enum Fruit {
//   Apple = 'apple',
//   Pear = 'pear',
//   Orange = 'orange',
// }
//
// const getFruitName = (fruit: Fruit): string => {
//   switch (fruit) {
//     case Fruit.Apple:
//       return 'Apple';
//     case Fruit.Pear:
//       return 'Pear';
//     case Fruit.Orange:
//       return 'Orange';
//   }
// };
//
// console.log(getFruitName(Fruit.Apple)); // Apple

// as const class
const Fruit = {
  Apple: 'apple',
  Pear: 'pear',
  Orange: 'orange',
  Mango: 'mango',
  Tomato: 'tomato',
} as const;

type Fruit = typeof Fruit[keyof typeof Fruit];

const getFruitName = (fruit: Fruit): string => {
  switch (fruit) {
    case Fruit.Apple:
      return 'Apple';
    case Fruit.Pear:
      return 'Pear';
    case Fruit.Orange:
      return 'Orange';
    case Fruit.Mango:
      return 'Mango';
    case Fruit.Tomato:
      return 'Tomato';
  }
};

const getFruitOptions = () => Object.entries(Fruit).map(([key, value]) => ({ description: key, value }));

console.log(getFruitName(Fruit.Apple)); // Apple

@Component({
  selector: 'ts-tricks-as-const',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatSelectModule, FormsModule],
  template: `
    <mat-card>
      <mat-card-content>Your fruit is: {{ getFruitName(favoriteFruit) }}</mat-card-content>
      <br />
      <mat-form-field>
        <mat-label>Favorite Fruit:</mat-label>
        <mat-select [(ngModel)]="favoriteFruit" name="favoriteFruit">
          <mat-option *ngFor="let fruit of fruitOptions" [value]="fruit.value">
            {{ fruit.description }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-card>
  `,
  styleUrls: ['./as-const.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsConstComponent {
  protected getFruitName = getFruitName;
  protected favoriteFruit: Fruit = Fruit.Apple;
  protected fruitOptions = getFruitOptions();
}
