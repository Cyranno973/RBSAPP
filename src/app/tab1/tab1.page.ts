import {Component, OnInit, ViewChild} from '@angular/core';
import {GoToMeetingService} from "../services/go-to-meeting.service";
import {ActivatedRoute} from "@angular/router";
import {Meeting, SearchHistory} from "../models/meeting";
import {filter, map} from "rxjs";
import {IonDatetime} from "@ionic/angular";

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


  constructor(private goToMeetingService: GoToMeetingService, private route: ActivatedRoute) {
  }

  download() {
    this.goToMeetingService.getHistoricalMeetings(this.searchHistory).pipe(map(v => v.filter(v => v.recording))).subscribe(v => {
      console.log(v);
      this.meetings = v;
    })
  }

  authen() {
    const proxyUrl = 'http://localhost:3000/api/auth/authenticate';
    window.location.href = proxyUrl;
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      if (accessToken) {
        console.log('Token d\'accès récupéré :', accessToken);
        return
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

  onChanged(a: string) {
    console.log('aaa')
    new this.datetimeEl.ionChange(true)
  }
  getmeetingById(){
    // this.goToMeetingService.getMeeting('144418421').subscribe(v => console.log(v))
    this.goToMeetingService.getMeeting('547203517').subscribe(v => console.log(v))
  }
  async getMeetingByOrganizer(){
    console.log("aaaaaa",this.searchHistory.startDate);
    if (!this.searchHistory.startDate) {return}
    const startDateISO = new Date(this.searchHistory.startDate as string).toISOString();
    this.goToMeetingService.getMeetingByOrganizer({...this.searchHistory, startDate: startDateISO, id: this.id, endDate: '2024-03-01T23:00:00Z'}).subscribe(v => console.log(v));
  }

  getMe(){
    this.goToMeetingService.getMe().subscribe(v => console.log(v))
  }
  getUserInfo(){
    this.goToMeetingService.getMe().subscribe(v => console.log(v))
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
