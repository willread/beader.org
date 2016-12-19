import 'jquery';
import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {AuthService, FetchConfig} from 'aurelia-auth';

@inject(AuthService, FetchConfig)
export class App {
  user = '';

  constructor(auth, fetchConfig) {
    this.auth = auth;
    this.fetchConfig = fetchConfig;
  }

  configureRouter(config, router){
    config.title = 'Contacts';
    config.addPipelineStep('postcomplete', ScrollUpStep);
    config.map([
      { route: '', moduleId: 'patterns', title: 'Beader' },
      { route: '/patterns', moduleId: 'patterns', title: 'Patterns', name: 'patterns' },
      { route: '/pattern/:id', moduleId: 'pattern', name: 'pattern'},
      { route: '/patterns/user/:id', moduleId: 'patternsByUser', name: 'patternsByUser'},
      { route: '/designer',  moduleId: 'designer', name:'designer', title: 'Designer' }
    ]);

    this.router = router;
  }

  activate() {
    this.fetchConfig.configure();
    this.fetchUser();
  }

  fetchUser() {
    this.auth.getMe()
      .then(user => {
        return this.user = user;
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

class ScrollUpStep {
  run(routingContext, next) {
    $("body").scrollTop(0);
    return next();
  }
}