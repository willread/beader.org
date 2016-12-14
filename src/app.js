import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {AuthService, FetchConfig} from 'aurelia-auth';

@inject(AuthService, FetchConfig)
export class App {
  constructor(auth, fetchConfig) {
    this.auth = auth;
    this.fetchConfig = fetchConfig;
  }

  configureRouter(config, router){
    config.title = 'Contacts';
    config.map([
      { route: '', moduleId: 'designer', title: 'Beader.org' },
      { route: 'designer',  moduleId: 'designer', name:'designer' }
    ]);

    this.router = router;
  }

  activate() {
    this.fetchConfig.configure();
  }

  authenticate(name) {
    return this.auth.authenticate(name, false, null)
      .then(response => {
        console.log("auth response:", response);
      });
  }
}
