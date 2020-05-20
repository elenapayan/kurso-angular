import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    // const username = this.loginForm.get('username').value;
    // const password = this.loginForm.get('password').value;

    const formLogin = this.loginForm.value;
    console.log(formLogin);

    // console.log('username', username);
    // console.log('password', password);

    this.loginService.login(formLogin);
  }
}
