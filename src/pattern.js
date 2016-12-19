import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Pattern {
  pattern = {}
  userPatterns = []
  totalUserPatterns = 0
  userPatternsLimit = 10
  errorMessage = null

  constructor(http) {
    this.http = http;
  }

  activate(params, routeConfig) {
    return this.http.fetch('https://beader-api.herokuapp.com/patterns/' + params.id)
      .then(response => response.json())
      .then(pattern => {
        this.pattern = pattern;
        routeConfig.navModel.setTitle(pattern.name);
        this.fetchUserPatterns(pattern.user._id);
      })
      .catch(err => {
        this.errorMessage = 'Pattern not found.';
      });
  }

  fetchUserPatterns(userId) {
    return this.http.fetch(`https://beader-api.herokuapp.com/patterns/user/${userId}?page=1&limit=${this.userPatternsLimit}`)
      .then(response => response.json())
      .then(response => {
        this.userPatterns = response.patterns.filter(pattern => {

          // Filter out the pattern we're viewing

          return pattern._id !== this.pattern._id;
        })
        this.totalUserPatterns = response.totalPatterns;
      });
  }
}
