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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
