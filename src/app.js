import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {AuthService, FetchConfig} from 'aurelia-auth';

@inject(AuthService, FetchConfig)
export class App {
  displayName = '';

  constructor(auth, fetchConfig) {
    this.auth = auth;
    this.fetchConfig = fetchConfig;
  }

  configureRouter(config, router){
    config.title = 'Contacts';
    config.map([
      { route: '', moduleId: 'patterns', title: 'Beader.org' },
      { route: '/pattern/:id', moduleId: 'pattern', name: 'pattern'},
      { route: '/designer',  moduleId: 'designer', name:'designer' }
    ]);

    this.router = router;
  }

  activate() {
    this.fetchConfig.configure();
    this.fetchUser();
  }

  fetchUser() {
    this.auth.getMe()
      .then(data => {
        return this.displayName = data.displayName;
      });
  }

  authenticate(name) {
    return this.auth.authenticate(name, false, null)
      .then(response => {
        this.fetchUser();
      });
  }

  get isAuthenticated() {
    let isAuthenticated = this.auth.isAuthenticated();
    return isAuthenticated;
  }

  logout() {
    return this.auth.logout()
      .then(response => {});
  }

  deactivate() {
    this.subscription.dispose();
  }
}
