import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { faker } from '@faker-js/faker/locale/en';
import { PushModule } from '@ngrx/component';
import { filter, map, Subject } from 'rxjs';

type Dinosaur = {
  name: string;
  feathers: boolean;
};

@Component({
  selector: 'ts-tricks-observable-filter',
  standalone: true,
  imports: [CommonModule, PushModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-content>
        <div>
          <pre>dino: {{ dinoName$ | ngrxPush }}</pre>
        </div>
        <button (click)="goodDino()">Add Good Dino</button>
        <button (click)="problem()">Problem!</button>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./observable-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableFilterComponent {
  #problematicSubject$ = new Subject<Dinosaur | undefined>();

  protected dinoName$ = this.#problematicSubject$.pipe(
    filter(isDino),
    map((dino) => `${dino.name} has feathers? ${dino.feathers}`)
  );

  goodDino() {
    this.#problematicSubject$.next({
      name: faker.helpers.arrayElement(['T-Rex', 'Velociraptor', 'Dimetrodon', 'Troodon']),
      feathers: faker.datatype.boolean(),
    });
  }

  problem() {
    this.#problematicSubject$.next(undefined);
  }
}

const isDino = (dino: Dinosaur | undefined): dino is Dinosaur => dino != null;
