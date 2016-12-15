import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Patterns {
  patterns = [];

  constructor(http) {
    this.http = http;
  }

  attached() {
    this.http.fetch('https://beader-api.herokuapp.com/patterns')
      .then(response => response.json())
      .then(response => this.patterns = response.patterns);
  }
}
