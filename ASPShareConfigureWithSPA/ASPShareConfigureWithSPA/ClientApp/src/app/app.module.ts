import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ConfigurationService } from './services/configuration.service';
import { MsalService } from './services/msal.service';

const appInitializerFn = (appConfig: ConfigurationService) => {
  return () => {
    return appConfig.loadConfiguration();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    // Register our config service as a provided service that
		// components may request.
		ConfigurationService,
    {
      // Here we request that configuration loading be done at app-
      // initialization time (prior to rendering)
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      deps: [ConfigurationService],
      multi: true //specify multi: true since there may be multiple APP_INITIALIZER functions registered.
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
