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

  getHistoricalMeetings(search: SearchHistory, uid: string): Observable<Meeting[]> {
    console.log(search);
    return this.http.post<Meeting[]>('http://localhost:3000/api/meetings/historicalMeetings', {search, uid})
  }
  getMeetingByOrganizer(search: SearchHistory, uid: string): Observable<Meeting[]> {
    console.log(search);
    console.log(uid);
    return this.http.post<Meeting[]>(`http://localhost:3000/api/meetings/meetingByOrganizer`, {search, uid})
  }

  getMeeting(uid: string, id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`http://localhost:3000/api/meetings/meeting/${id}?uid=${uid}`);
  }

  getMe(uid: string): Observable<Meeting> {
    return this.http.get<Meeting>(`http://localhost:3000/api/meetings/me?uid=${uid}`);
  }
  getUserInfo(uid: string): Observable<Meeting> {
    return this.http.get<Meeting>(`http://localhost:3000/api/meetings/userInfo?uid=${uid}`);
  }
}
