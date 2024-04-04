import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meeting, SearchHistory} from "../models/meeting";


@Injectable({
  providedIn: 'root'
})
export class GoToMeetingService {

  constructor(private http: HttpClient) {
  }

  getHistoricalMeetings(search: SearchHistory): Observable<Meeting[]> {
    console.log(search);
    return this.http.post<Meeting[]>('http://localhost:3000/getHistoricalMeetings', {startDate: search.startDate, endDate: search.endDate})
  }
  getMeetingByOrganizer(search: SearchHistory): Observable<Meeting[]> {
    console.log(search);
    return this.http.post<Meeting[]>(`http://localhost:3000/getMeetingByOrganizer`, search)
  }

  getMeeting(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`http://localhost:3000/getMeeting/${id}`);
  }

  getMe(): Observable<Meeting> {
    return this.http.get<Meeting>(`http://localhost:3000/getMe`);
  }
  getUserInfo(): Observable<Meeting> {
    return this.http.get<Meeting>(`http://localhost:3000/getUserInfo`);
  }
}
