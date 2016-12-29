import 'jquery';
import 'whatwg-fetch';
import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {AuthService, FetchConfig} from 'aurelia-auth';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(AuthService, FetchConfig, HttpClient)
export class App {
  user = '';

  constructor(auth, fetchConfig, http) {
    this.auth = auth;
    this.fetchConfig = fetchConfig;
    this.http = http;

    http.configure(config => {
      config
        .withBaseUrl("https://beader-api.herokuapp.com");
    });
  }

  configureRouter(config, router){
    config.title = 'Beader';
    config.addPipelineStep('postcomplete', ScrollUpStep);
    config.map([
      { route: '', moduleId: 'patterns', title: '' },
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