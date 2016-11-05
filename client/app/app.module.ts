import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { routing, appRoutingProviders } from './app.routes';
import { SDKModule } from './shared/sdk/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    appRoutingProviders,
    AUTH_PROVIDERS
  ],
  imports: [
    BrowserModule,
    routing,
    SDKModule.forRoot()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
