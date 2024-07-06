import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: string | null = null;
  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      const loginData = this.loginForm.value;
      console.log(loginData);
    } else {
      this.error = 'Please fill the form correctly';
    }
  }
}
