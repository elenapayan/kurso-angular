import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserStoreService } from './auth/user.store.service';
import { Notificacion } from './models/notificacion.model';
import { User } from './models/user.model';
import { NotificacionesBusService } from './notificaciones-bus.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'kurso-angular';
  msgs: Notificacion[] = [];
  user: Observable<User[]>;

  constructor(
    private notificacionesBus: NotificacionesBusService,
    private userStore: UserStoreService) { }

  ngOnInit() {
    this.notificacionesBus.getNotificacion().subscribe(
      (notificacion) => {
        this.msgs = [];
        this.msgs.push(notificacion);
      });
    this.userStore.init();
    this.user = this.userStore.get$();
  }

  logout() {
    this.userStore.logout();
  }
}
