import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Deadline} from "../models/deadline.model";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  url = 'http://localhost:3000';

  http = inject(HttpClient);

  getDeadline(): Observable<Deadline> {
    return this.http.get<Deadline>(`${this.url}/deadline`);
  }
}
