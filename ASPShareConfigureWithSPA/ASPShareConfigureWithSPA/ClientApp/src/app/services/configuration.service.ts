import { Injectable, Inject } from '@angular/core';
import { IServerConfiguration } from '../models/configuration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConfigurationService {

  private readonly configUrlPath: string = 'api/ClientConfiguration';
  private configuration: IServerConfiguration;

  // Inject the http service and the app's BASE_URL
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private originUrl: string) { }

  // Call the ClientConfiguration endpoint, deserialize the response,
  // and store it in this.configData.
  //https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
  loadConfiguration() {
    return this.http.get<IServerConfiguration>(`${this.originUrl}${this.configUrlPath}`)
      .toPromise()
      .then(result => {
        this.configuration = <IServerConfiguration> (result);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  // A helper property to return the config object
	get config(): IServerConfiguration {
		return this.configuration;
	}

}
