import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { DataTablesModule } from "angular-datatables";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { SharedModule } from './shared/shared.module';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { ErrorRobotComponent } from './components/error-robot/error-robot.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    ErrorRobotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
    AdminDashboardModule,
    DataTablesModule,
    BrowserAnimationsModule,
    RecaptchaV3Module,
    FormsModule,
    MaterialModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES'
  },
  {
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: environment.recaptcha.siteKey,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
