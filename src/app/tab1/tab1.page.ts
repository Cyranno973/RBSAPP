import {Component, OnInit, ViewChild} from '@angular/core';
import {GoToMeetingService} from "../services/go-to-meeting.service";
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
  auth: boolean = false;
  @ViewChild(IonDatetime, {static: false}) datetimeEl!: IonDatetime;
  maxDate: string = new Date().toISOString().split('T')[0];
  searchHistory: SearchHistory = {};
  user!: User | null;

  constructor(private goToMeetingService: GoToMeetingService, private authService: AuthService, public loadingController: LoadingController) {}

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

  record(downloadUrl: string) {
    // window.open(downloadUrl, '_blank');
    this.goToMeetingService.uploadFromGoToMeeting(
      "https://cdn.recordingassets.logmeininc.com/8251427265828452588/7972725270140104878/f6199dc6-8545-44b0-ac77-12d366d94131/recording/6208747987644228360/transcode/6208747987644228360.mp4?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2RuLnJlY29yZGluZ2Fzc2V0cy5sb2dtZWluaW5jLmNvbS84MjUxNDI3MjY1ODI4NDUyNTg4Lzc5NzI3MjUyNzAxNDAxMDQ4NzgvZjYxOTlkYzYtODU0NS00NGIwLWFjNzctMTJkMzY2ZDk0MTMxLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3MTU4NDM4NjB9fX1dfQ__&Signature=jVVtVTDt0PlE3kPc~Or6CTm4S0tWYnwWTzgDbShJ8l2jA9VoMEnulHHQBehmRLBDZIAhVCjDVVuF4ywIVDHG0cJrjZvk2JhkNBBVNr7vqsaZpC7BkyAGx1zndRB6WXiK7f3COZS~3p73ElfIwuJbR-Pkf8piQQJVm1n1eb323meZ3M27sAX0c2QrjhUIckkPL6le9rL0mBpc9WqCeQEYuDbg~pS1EsQc~hcIsjud4hDkCf7Fp9~KO-wfhpgj6cEG4qwxwALQOSmMXq6MoQuJScY45iubj7VR02EN6mI5Yjcad8IdFhPh82jhJ0ZOcYaslbg3JJSeMAFre-NU3goceQ__&Key-Pair-Id=APKAI2Z3PWL3BWDDZ5IA&response-content-disposition=attachment",
      "video de test",
      "ceci est unevideo du moi de mai",
      "paque",
      "22").subscribe(c =>  console.log(c))
  }

  async confirm() {
    this.loadingController.create({
      message: 'Loading...'
    }).then((response) => {
      response.present();
    });
    await this.datetimeEl.confirm();
    if (!this.datetimeEl.value || !this.user) {
      return;
    }

    const selectedDate: Date = new Date(this.datetimeEl.value as string);

    // Ajuster la date pour toujours commencer au 1er jour du mois
    const adjustedDate: Date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    // Utiliser la date ajustée
    this.searchHistory.startDate = adjustedDate.toISOString(); // Convertir en format ISO string

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

  reset() {
    this.datetimeEl.reset().then();
  }

  getmeetingById() {
    if (!this.user) {
      return
    }
    this.goToMeetingService.getMeeting(this.user?.uid).subscribe(v => console.log(v))
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

  cancel() {

  }
}
