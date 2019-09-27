import { Injectable, Inject } from '@angular/core';
import { Configuration } from '../models/configuration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConfigurationService {

  private readonly configUrlPath: string = 'api/ClientConfiguration';
  private configData: Configuration;

  // Inject the http service and the app's BASE_URL
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private originUrl: string) { }

  // Call the ClientConfiguration endpoint, deserialize the response,
  // and store it in this.configData.
  //https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
  loadConfigurationData(): Promise<Configuration>{
    return this.http.get(`${this.originUrl}${this.configUrlPath}`)
      .toPromise()
      .then((response: Configuration) => {
        this.configData = response;
        return this.configData;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  // A helper property to return the config object
	get config(): Configuration {
		return this.configData;
	}

}
