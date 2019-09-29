import { Component } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { MsalService } from '../services/msal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  // configService is public so that it can be used direcetly from
	// the html template.
	constructor(public configService: ConfigurationService, private msalService: MsalService) { }

	// This helper property creates an array of an appropriate length
	// (based on messageCount) for *ngFor to loop over.
	get messageCount(): Array<any> {
		return new Array(this.configService.config.messageCount);
	}

	useremail(){
		let useremail = this.msalService.getUserEmail();
		return useremail;
	  }
	
	  login(){
		this.msalService.login();
	  }
	
	  signup(){
		this.msalService.signup();
	  }
	
	  logout(){
		this.msalService.logout();
	  }
	
	  isUserLoggedIn(){
		let loggedIn = this.msalService.isLoggedIn();
		return loggedIn;
	  }
}
