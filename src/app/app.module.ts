import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//COMPONENTES
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { AppComponent } from './app.component';
//MODULOS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxToastNotifierModule } from 'ngx-toast-notifier';

@NgModule({
  declarations: [
    AppComponent,
    NoPageFoundComponent
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    NgbModule,
    HttpClientModule,
    NgxToastNotifierModule.forRoot({
      timeOut:5000
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
