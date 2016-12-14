define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.message = 'Hello World!';
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n\n  <header class=\"navbar navbar-fixed-top\">\n      <div class=\"navbar-inner\">\n          <div class=\"container\">\n              <a class=\"pull-left\" href=\"/\"><img src=\"/images/logo.png\"></a>\n              <ul class=\"nav pull-right\">\n                  <li><a href=\"/\">Pattern Gallery</a></li>\n                  <li><a href=\"/create\">Design a Pattern</a></li>\n                  <li ng-controller=\"AuthCtrl\" id=\"login-item\" class=\"dropdown\">\n                      <a ng-if=\"!user\" class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">Login</a>\n                      <a ng-if=\"user\" class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">{{user.displayName}}</a>\n                      <div id=\"login\" class=\"dropdown-menu\">\n                          <a ng-if=\"!user\" ng-click=\"googleLogin()\" href=\"\" class=\"btn\">Login with Google</a>\n                          <a ng-if=\"user\" ng-click=\"googleLogout()\" href=\"\" class=\"btn\">Log Out</a>\n                      </div>\n                  </li>\n              </ul>\n          </div>\n      </div>\n  </header>\n  <article ng-view class=\"container\"></article>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map