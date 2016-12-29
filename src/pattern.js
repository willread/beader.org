import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {App} from './app';
import {Router} from 'aurelia-router';

@inject(HttpClient, App, Router)
export class Pattern {
  pattern = {}
  userPatterns = []
  totalUserPatterns = 0
  userPatternsLimit = 10
  errorMessage = null

  constructor(http, app, router) {
    this.http = http;
    this.app = app;
    this.router = router;
  }

  activate(params, routeConfig) {
    return this.http.fetch(`/patterns/${params.id}`)
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
    return this.http.fetch(`/patterns/user/${userId}?page=1&limit=${this.userPatternsLimit}`)
      .then(response => response.json())
      .then(response => {
        this.userPatterns = response.patterns.filter(pattern => {

          // Filter out the pattern we're viewing

          return pattern._id !== this.pattern._id;
        })
        this.totalUserPatterns = response.totalPatterns;
      });
  }

  delete() {
    if(confirm('Are you sure you want to delete this pattern?')){
      return this.http.fetch(`/patterns/${this.pattern._id}`, {
        method: 'delete'
      })
        .then(response => {
          this.router.navigateToRoute('patterns');
        });
    }
  }
}
