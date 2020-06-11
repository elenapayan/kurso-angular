import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackOfficeService } from 'src/app/back-office/back-office.service';
import { NotificacionesBusService } from 'src/app/notificaciones-bus.service';
// import { LoginService } from '../login.service';
import { UserStoreService } from '../user.store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  welcomeForm: FormGroup;
  show: boolean;
  btnSelectedIsLogin: boolean;

  constructor(
    private backService: BackOfficeService,
    private notificacionesBus: NotificacionesBusService,
    private userStore: UserStoreService
  ) { }

  ngOnInit(): void {
    this.userStore.init();
    this.show = false;
    this.btnSelectedIsLogin = false;
    this.welcomeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    const loginForm = this.welcomeForm.value;
    this.userStore.login$(loginForm);
  }


  register(): void {
    const newUser = this.welcomeForm.value;
    this.backService.createUser(newUser).subscribe((data) => {
      if (data) {
        this.notificacionesBus.showInfo('Register correctly, please, log in');
        this.showForm('');
        this.reset();
      }
    }, (err) => {
      this.notificacionesBus.showError('The username is taken, try another one');
      this.showForm('');
      this.reset();
    });
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
    this.reset();
  }

  reset(): void {
    this.welcomeForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
}
