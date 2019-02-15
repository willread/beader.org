import environment from './environment';
import authConfig from './authConfig';

//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-auth', baseConfig => {
      baseConfig.configure(authConfig);
    })
    .plugin('aurelia-google-analytics', config => {
        config.init('UA-89265200-1');
        config.attach({
          logging: {
            enabled: true
          },
          pageTracking: {
            enabled: true
          },
          clickTracking: {
            enabled: true
          }
        });
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
