import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meeting} from "../models/meeting";


@Injectable({
  providedIn: 'root'
})
export class GoToMeetingService {

  constructor(private http: HttpClient) { }

  getHistoricalMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>('http://localhost:3000/getHistoricalMeetings')
  }
}
