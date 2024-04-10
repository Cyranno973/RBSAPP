import {Component, OnInit, ViewChild} from '@angular/core';
import {GoToMeetingService} from "../services/go-to-meeting.service";
import {ActivatedRoute} from "@angular/router";
import {Meeting, MeetingType, SearchHistory} from "../models/meeting";
import {map} from "rxjs";
import {IonDatetime} from "@ionic/angular";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth.service";
import User = firebase.User;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  meetings!: Meeting[];
  startDate!: string;
  endDate!: string;
  showDate = false;
  showEndDate = false;
  auth: boolean = false;
  @ViewChild(IonDatetime, {static: false}) datetimeEl!: IonDatetime;
  maxDate: string = new Date().toISOString().split('T')[0];
  selectedDate: any;
  selecting: 'start' | 'end' = 'start';
  searchHistory: SearchHistory = {};
  id: string = '7972725270140104878';
  user!: User | null;

  constructor(private goToMeetingService: GoToMeetingService, private router: ActivatedRoute, private authService: AuthService) {
  }

  download() {
    if (!this.user) {
      return
    }

  }

  ngOnInit(): void {
    // Vérifiez si l'utilisateur est connecté et récupérez le token d'accès externe si présent
    this.authService.getCurrentUser().subscribe(user => {
      if (user) this.user = user;
    });
  }
  onDatetimeFocus(): void {
    console.log('Datetime focused!');
  }
  async onDatetimeChange(event: any): Promise<void> {
   console.log('Datetime changed!', event.detail);
    console.log('Datetime changed!', event.detail.value);
  }
  record(downloadUrl: string) {
    window.open(downloadUrl, '_blank');
  }

  async confirm() {
    console.log(confirm);
    await this.datetimeEl.confirm();
    if (!this.datetimeEl.value || !this.user) {
      return;
    }

    this.searchHistory.startDate = this.datetimeEl.value as string;
    this.searchHistory.id = this.id;
    this.goToMeetingService.getHistoricalMeetings(this.searchHistory, this.user?.uid)
      .pipe(
        map(meetings => meetings.filter(meeting => meeting.recording)),
        map(meetings => meetings.map(meeting => ({
          ...meeting,
          // Ajuste le format de startTime avant de l'utiliser
          startTime: this.adjustDateFormat(meeting.startTime)
        })))
      )
      .subscribe(meetings => {
        console.log(meetings);
        // Assurez-vous que meetings est correctement typé pour accepter startTime comme une chaîne
        this.meetings = meetings;
      });
  }

  adjustDateFormat(dateStr: string): string {
    // Vérifie et remplace le format de fuseau horaire incorrect par "Z" pour UTC
    return dateStr.replace(/\.\+0000$/, 'Z');
  }

  cancel() {
    this.showDate = false;
    this.meetings = [
      {
        startTime: "2024-04-10T18:24:05.+0000",
        endTime: "2024-04-10T19:37:03.+0000",
        lastName: "RhemaBethShalom",
        duration: "72",
        numAttendees: "14",
        accountKey: "8251427265828452588",
        email: "rhemabethshalom+res@gmail.com",
        sessionId: "6554670837735703856",
        subject: "Ministères Évangéliques RHEMA",
        locale: "fr_FR",
        organizerKey: "7972725270140104878",
        meetingId: "144418421",
        meetingType: MeetingType.recurring,
        firstName: "RBS",
        conferenceCallInfo: "PRIVATE",
        recording: {
          recordingName: "Ministères Évangéliques RHEMA-202404101832",
          recordingId: "4127a77d-3c5d-4ae9-bdab-8215e9ef48ff",
          downloadUrl: "https://example.com/recording.mp4",
          fileSize: 1315624774,
          shareUrl: "https://example.com/shareUrl",
        },
      },
      // Ajoutez ici le deuxième objet Meeting
    ];
  }

  reset() {
    this.datetimeEl.reset().then(() => this.showDate = false);
  }

  getmeetingById() {
    if (!this.user) {
      return
    }
    // this.goToMeetingService.getMeeting('144418421').subscribe(v => console.log(v))
    this.goToMeetingService.getMeeting(this.user?.uid, '547203517').subscribe(v => console.log(v))
  }

  getMe() {
    if (!this.user) {
      return
    }
    this.goToMeetingService.getMe(this.user?.uid).subscribe(v => console.log(v))
  }

  getUserInfo() {
    if (!this.user) {
      return
    }
    this.goToMeetingService.getUserInfo(this.user?.uid).subscribe(v => console.log(v))
  }

  dateChanged(event: any) {
    const selectedDate = event.detail.value;
    if (this.selecting === 'start') {
      this.startDate = selectedDate;
      console.log('Date de début sélectionnée:', this.startDate);
    } else {
      this.endDate = selectedDate;
      console.log('Date de fin sélectionnée:', this.endDate);
    }
  }
}
