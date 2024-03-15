import {Component, OnInit} from '@angular/core';
import {GoToMeetingService} from "../services/go-to-meeting.service";
import {ActivatedRoute} from "@angular/router";
import {Meeting} from "../models/meeting";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
meetings!: Meeting[];
  startDate!: string;
  endDate!: string;
  showStartDate = false;
  showEndDate = false;
  auth:boolean = false;
  title = 'ngModelTest';
  userInput: string = 'aa';
  constructor(private goToMeetingService: GoToMeetingService, private route: ActivatedRoute) {
  }

  download() {
    const proxyUrl = 'http://localhost:3000/api/authenticate';
    window.location.href = proxyUrl;
  this.goToMeetingService.getHistoricalMeetings().pipe(map(v => v.filter(v => v.recording))).subscribe(v => {
    console.log(v);
this.meetings = v;
  })
  }

  authen() {
    const proxyUrl = 'http://localhost:3000/api/authenticate';
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
  openStartDate() {
    this.showStartDate = true;
  }
  onDateChange(event: any) {
    console.log(event);
    this.startDate = event.detail.value;
  }
  confirmStartDate(value: any) {
    this.startDate = value; // Met à jour la valeur de startDate avec la valeur sélectionnée
    this.showStartDate = false; // Cache le sélecteur de date
    console.log('Date de début confirmée:', this.startDate);
  }

  cancelStartDate() {
    this.showStartDate = false;
    console.log('annullerr')
    // Optionnel : réinitialiser la sélection de la date de début si nécessaire
  }

  openEndDate() {
    this.showEndDate = true;
  }

  confirmEndDate() {
    this.showEndDate = false;
    // Logique supplémentaire pour traiter la date de fin sélectionnée
    console.log('Date de fin confirmée:', this.endDate);
  }

  cancelEndDate() {
    this.showEndDate = false;
    // Optionnel : réinitialiser la sélection de la date de fin si nécessaire
  }
}
