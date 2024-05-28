import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RestService} from "../services/rest.service";
import {map, switchMap, takeWhile} from "rxjs/operators";
import {Deadline} from "../models/deadline.model";
import {AsyncPipe} from "@angular/common";
import {timer} from "rxjs";

@Component({
  selector: 'app-deadline',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './deadline.component.html',
  styleUrl: './deadline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadlineComponent {

  restService = inject(RestService);

  secondsLeft$ = this.restService.getDeadline().pipe(
    map((deadline: Deadline) => deadline.secondsLeft),
    switchMap((seconds: number) =>
      timer(0, 1000).pipe(
        map((val: number) => seconds - val),
        takeWhile((remainingSeconds: number) => remainingSeconds >= 0)
      )
    )
  )

}
