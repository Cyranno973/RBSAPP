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
  uploadFromGoToMeeting(videoUrl: string, title: string, description: string, tags: string, categoryId: string): Observable<any> {
    const payload = {
      videoUrl,
      title,
      description,
      tags,
      categoryId
    };
    return this.http.post<any>(`${environment.apiUrl}/youtube/uploadFromGoToMeeting`, payload);
  }
  uploadVideo(urlVideo: string): any {
    return this.http.get<Meeting[]>(`${environment.apiUrl}/youtube/historicalMeetings`)
  }
  getMeetingByOrganizer(search: SearchHistory, uid: string): Observable<Meeting[]> {
    console.log(search);
    console.log(uid);
    return this.http.post<Meeting[]>(`${environment.apiUrl}/meetings/meetingByOrganizer`, {search, uid})
  }

  getMeeting(uid: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${environment.apiUrl}/meetings/meeting/?uid=${uid}`);
  }

  getMe(uid: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${environment.apiUrl}/meetings/me?uid=${uid}`);
  }
  getUserInfo(uid: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${environment.apiUrl}/meetings/userInfo?uid=${uid}`);
  }
}
