import { Injectable } from '@angular/core';
import * as Msal from 'msal';

@Injectable({
  providedIn: 'root'
})
export class MsalService {

  B2CTodoAccessTokenKey = "b*_H%rU4wOg^487N`MTr8}M3";

    tenantConfig = {
        tenant: "merlionb2c.onmicrosoft.com",
        // Replace this with your client id 
        clientID: '0ae2a4ea-df11-41cc-9879-82953108ee42',
        signInPolicy: "B2C_1_signin",
        signUpPolicy: "B2C_1_signup",
        redirectUri:"https://localhost:5003",
        b2cScopes:["https://merlionb2c.onmicrosoft.com/access-api/user_impersonation"]
    };

    // Configure the authority for Azure AD B2C
    authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority,
        function (errorDesc: any, token: any, error: any, tokenType: any) {
      }
    );

    public login():void{
      this.clientApplication.authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signInPolicy;
      this.authenticate();
    }

    public signup():void{
      this.clientApplication.authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpPolicy;
      this.authenticate();
    }

    public authenticate(): void {
        var _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
            _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                function (accessToken: any) {
                    _this.saveAccessTokenToCache(accessToken);
                }, function (error: any) {
                    _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                        function (accessToken: any) {
                            _this.saveAccessTokenToCache(accessToken);
                        }, function (error: any) {
                            console.log("error: ", error);
                        });
                })
        }, function (error: any) {
            console.log("error: ", error);
        });
    }

    saveAccessTokenToCache(accessToken: string): void {
        sessionStorage.setItem(this.B2CTodoAccessTokenKey, accessToken);
    };

    logout(): void {
        this.clientApplication.logout();
    };

    isLoggedIn(): boolean {
        return this.clientApplication.getUser() != null;
    };

    getUserEmail(): string{
      if(this.getUser()==null){
        return "";
      }
      else{
        return this.getUser().idToken['emails'][0];
      }
    }

    getUser(){
      return this.clientApplication.getUser()
    }
}
