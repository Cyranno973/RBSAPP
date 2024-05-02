import {Component, OnInit, ViewChild} from '@angular/core';
import {GoToMeetingService} from "../services/go-to-meeting.service";
import {ActivatedRoute} from "@angular/router";
import {Meeting, SearchHistory} from "../models/meeting";
import {map} from "rxjs";
import {IonDatetime, LoadingController} from "@ionic/angular";
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

  constructor(private goToMeetingService: GoToMeetingService, private router: ActivatedRoute,
              private authService: AuthService, public loadingController: LoadingController,
    private route: ActivatedRoute
              ) {
  }

  download() {
    if (!this.user) {
      return
    }

  }

  ngOnInit(): void {
    console.log(this.route.snapshot.data['title']);

    // Vérifiez si l'utilisateur est connecté et récupérez le token d'accès externe si présent
    this.authService.getCurrentUser().subscribe(user => {
      if (user) this.user = user;
    });
  }

  record(downloadUrl: string) {
    window.open(downloadUrl, '_blank');
  }

  async confirm() {
    this.loadingController.create({
      message: 'Loading...'
    }).then((response) => {
      response.present();
    });
    console.log(confirm);
    await this.datetimeEl.confirm();
    if (!this.datetimeEl.value || !this.user) {
      return;
    }

    const selectedDate: Date = new Date(this.datetimeEl.value as string);

    // Ajuster la date pour toujours commencer au 1er jour du mois
    const adjustedDate: Date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    // Utiliser la date ajustée
    this.searchHistory.startDate = adjustedDate.toISOString(); // Convertir en format ISO string
    this.searchHistory.id = this.id;

    console.log(this.searchHistory.startDate);
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
        this.loadingController.dismiss().then((response) => {
          console.log('Loader closed!', response);
        }).catch((err) => {
          console.log('Error occured : ', err);
        });
      });
  }

  adjustDateFormat(dateStr: string): string {
    // Vérifie et remplace le format de fuseau horaire incorrect par "Z" pour UTC
    return dateStr.replace(/\.\+0000$/, 'Z');
  }

  cancel() {
    this.showDate = false;
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
