import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Pattern {
  pattern = {};
  errorMessage = null;

  constructor(http) {
    this.http = http;
  }

  activate(params, routeConfig) {
    this.http.fetch('https://beader-api.herokuapp.com/patterns/' + params.id)
      .then(response => response.json())
      .then(pattern => {
        this.pattern = pattern;
        routeConfig.navModel.setTitle(pattern.name);
      })
      .catch(err => this.errorMessage = 'Pattern not found.');
  }
}
