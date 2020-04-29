import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {activationStrategy} from 'aurelia-router';

@inject(HttpClient)
export class PatternsByUser {
  patterns = []
  page = 1
  limit = 20
  showNext = false
  showPrevious = false
  loading = true

  constructor(http) {
    this.http = http;
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params, routeConfig) {
    this.page = params.page ? parseInt(params.page, 10) : 1;

    this.http.fetch(`/patterns/user/${params.id}?page=${this.page}&limit=${this.limit}`)
      .then(response => response.json())
      .then(response => {
        this.patterns = response.patterns

        if(this.page > 1){
          this.showPrevious = true;
        }
        if(this.page < response.totalPages){
          this.showNext = true;
        }

        if(this.patterns.length){
          routeConfig.navModel.setTitle(`Patterns by ${this.patterns[0].user.displayName}`);
        }

        this.loading = false
      });
  }
}