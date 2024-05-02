import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meeting, SearchHistory} from "../models/meeting";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class GoToMeetingService {

  constructor(private http: HttpClient) {
  }

  getHistoricalMeetings(search: SearchHistory, uid: string): Observable<Meeting[]> {
    console.log(search);
    return this.http.post<Meeting[]>(`${environment.apiUrl}/meetings/historicalMeetings`, {search, uid})
  }
  getMeetingByOrganizer(search: SearchHistory, uid: string): Observable<Meeting[]> {
    console.log(search);
    console.log(uid);
    return this.http.post<Meeting[]>(`${environment.apiUrl}/meetings/meetingByOrganizer`, {search, uid})
  }

  getMeeting(uid: string, id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${environment.apiUrl}/meetings/meeting/${id}?uid=${uid}`);
  }

  getMe(uid: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${environment.apiUrl}/meetings/me?uid=${uid}`);
  }
  getUserInfo(uid: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${environment.apiUrl}/meetings/userInfo?uid=${uid}`);
  }
}
