import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home/home.component';
import { SharedModule } from './shared/shared.module';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'backOffice', canActivate: [AuthService],
    loadChildren: () => import('../app/back-office/back-office.module').then(m => m.BackOfficeModule)
  },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    HomeModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    SharedModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: MessageService
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
