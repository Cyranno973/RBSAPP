import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-form-component',
  templateUrl: './auth-form-component.component.html',
  styleUrls: ['./auth-form-component.component.scss'],
})
export class AuthFormComponentComponent  implements OnInit {
  @Input() formType: 'login' | 'signup' = 'login';
  @Input({ required: true}) form!: FormGroup;
  @Input() errorMessage: string ="";
  @Output() formSend: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.formSend.emit(this.form);
  }
}
