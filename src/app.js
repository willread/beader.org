import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  constructor() {}

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: '', moduleId: 'designer', title: 'Beader.org' },
      { route: 'designer',  moduleId: 'designer', name:'designer' }
    ]);

    this.router = router;
  }
}
