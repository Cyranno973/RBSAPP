import {Component, OnInit, ViewChild} from '@angular/core';
import {IonDatetime} from "@ionic/angular";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  selectedDate!: string;
  @ViewChild(IonDatetime, { static: false }) datetimeEl!: IonDatetime;
  constructor() { }
  async confirm() {
    await this.datetimeEl.confirm();
    console.log(this.datetimeEl.value);
  }

  reset() {}
  cancel() {}


}
