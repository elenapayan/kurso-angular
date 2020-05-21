import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { BackOfficeService } from 'src/app/back-office/back-office.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  welcomeForm: FormGroup;
  subUser: Subscription;
  show: boolean;
  btnSelectedIsLogin: boolean;

  constructor(private loginService: LoginService, private backService: BackOfficeService) { }

  ngOnInit(): void {
    this.show = false;
    this.btnSelectedIsLogin = false;
    this.welcomeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    const loginForm = this.welcomeForm.value;
    console.log('log', loginForm);
    this.loginService.login(loginForm);
  }

  register(): void {
    const newUser = this.welcomeForm.value;
    console.log('reg', newUser);
    this.backService.createUser(newUser).subscribe();
  }

  handleWelcome(): void {
    if (this.btnSelectedIsLogin) {
      this.login();
    } else {
      this.register();
    }
  }

  showForm(log): void {
    this.show = !this.show;
    if (log) {
      this.btnSelectedIsLogin = true;
    } else {
      this.btnSelectedIsLogin = false;
    }
  }

  ngOnDestroy(): void {
    if (this.subUser) {
      this.subUser.unsubscribe();
    }
  }
}
