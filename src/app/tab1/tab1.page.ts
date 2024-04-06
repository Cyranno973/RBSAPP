import {Component, OnInit, ViewChild} from '@angular/core';
import {GoToMeetingService} from "../services/go-to-meeting.service";
import {ActivatedRoute} from "@angular/router";
import {Meeting, SearchHistory} from "../models/meeting";
import {filter, map} from "rxjs";
import {IonDatetime} from "@ionic/angular";
import firebase from "firebase/compat";
import User = firebase.User;
import {AuthService} from "../services/auth.service";

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
  id: string ='7972725270140104878';
  user!: User | null;

  constructor(private goToMeetingService: GoToMeetingService, private router: ActivatedRoute, private authService: AuthService) {
  }

  download() {
    if(!this.user) {return}
    this.goToMeetingService.getHistoricalMeetings(this.searchHistory, this.user?.uid).pipe(map(v => v.filter(v => v.recording))).subscribe(v => {
      console.log(v);
      this.meetings = v;
    })
  }

  authen() {
    const proxyUrl = 'http://localhost:3000/api/auth/authenticate';
    window.location.href = proxyUrl;
  }

  ngOnInit(): void {
    // Vérifiez si l'utilisateur est connecté et récupérez le token d'accès externe si présent
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user; // Assurez-vous d'avoir une propriété user dans votre classe pour stocker l'utilisateur actuel
        // this.checkForExternalAuthToken();
      }
    });
  }

  checkForExternalAuthToken() {
    this.router.queryParams.subscribe(params => {
      const accessToken = params['access_token'];
      if (accessToken && this.user?.uid) {
        console.log('Token d\'accès récupéré :', accessToken);
        // Stockez le token pour l'utilisateur dans Firestore
        // this.authService.saveTokenUser(this.user.uid, accessToken).then(() => {
        //   console.log('Token enregistré avec succès pour l\'utilisateur');
        //   // Effectuez d'autres actions après l'enregistrement du token si nécessaire
        // });
      }
    });
  }

  record(downloadUrl: string) {
    window.open(downloadUrl, '_blank');
  }


  async confirm() {
    await this.datetimeEl.confirm();
    console.log(this.datetimeEl.value);
    this.showDate = false;
    if(this.datetimeEl.value) this.searchHistory.startDate =  this.datetimeEl.value as string
    this.searchHistory.id = this.id;
  }

  cancel() {
    this.showDate = false;
  }

  reset() {
    this.datetimeEl.reset().then(() => this.showDate = false);
  }
  getmeetingById(){
    if(!this.user) {return}
    // this.goToMeetingService.getMeeting('144418421').subscribe(v => console.log(v))
    this.goToMeetingService.getMeeting(this.user?.uid, '547203517').subscribe(v => console.log(v))
  }
  async getMeetingByOrganizer(){
    if(!this.user) {return}
    // console.log("aaaaaa",this.searchHistory.startDate);
    if (!this.searchHistory.startDate) {return}
    const startDateISO = new Date(this.searchHistory.startDate as string).toISOString();
    this.goToMeetingService.getMeetingByOrganizer({...this.searchHistory, startDate: startDateISO, id: this.id, endDate: '2024-03-01T23:00:00Z'}, this.user?.uid).subscribe(v => {
      console.log(v);
      this.meetings = v;
    });
  }

  getMe(){
    if(!this.user) {return}
    this.goToMeetingService.getMe(this.user?.uid).subscribe(v => console.log(v))
  }
  getUserInfo(){
    if(!this.user) {return}
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
