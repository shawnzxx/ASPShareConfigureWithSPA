import { Component } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  // configService is public so that it can be used direcetly from
	// the html template.
	constructor(public configService: ConfigurationService) { }

	// This helper property creates an array of an appropriate length
	// (based on messageCount) for *ngFor to loop over.
	get messageCount(): Array<any> {
		return new Array(this.configService.config.messageCount);
	}
}
