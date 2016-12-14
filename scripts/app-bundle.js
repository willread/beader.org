define('app',['exports', 'aurelia-router'], function (exports, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;
  class App {
    constructor() {}

    configureRouter(config, router) {
      config.title = 'Contacts';
      config.map([{ route: '', moduleId: 'designer', title: 'Beader.org' }, { route: 'designer', moduleId: 'designer', name: 'designer' }]);

      this.router = router;
    }
  }
  exports.App = App;
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

  //Configure Bluebird Promises.
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

    aurelia.start().then(() => aurelia.setRoot());
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    //config.globalResources([]);
  }
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n\n  <header class=\"navbar navbar-fixed-top\">\n      <div class=\"navbar-inner\">\n          <div class=\"container\">\n              <a class=\"pull-left\" href=\"/\"><img src=\"/images/logo.png\"></a>\n              <ul class=\"nav pull-right\">\n                  <li><a href=\"/\">Pattern Gallery</a></li>\n                  <li><a href=\"/create\">Design a Pattern</a></li>\n                  <li ng-controller=\"AuthCtrl\" id=\"login-item\" class=\"dropdown\">\n                      <a ng-if=\"!user\" class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">Login</a>\n                      <a ng-if=\"user\" class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">{{user.displayName}}</a>\n                      <div id=\"login\" class=\"dropdown-menu\">\n                          <a ng-if=\"!user\" ng-click=\"googleLogin()\" href=\"\" class=\"btn\">Login with Google</a>\n                          <a ng-if=\"user\" ng-click=\"googleLogout()\" href=\"\" class=\"btn\">Log Out</a>\n                      </div>\n                  </li>\n              </ul>\n          </div>\n      </div>\n  </header>\n  <router-view class=\"container\"></router-view>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body {\n  background: #666 url(\"../images/bg.png\");\n}\nheader .navbar-inner {\n  height: 40px;\n  background: #1d3966 url(\"../images/header.png\");\n  border-bottom: 1px solid #224;\n}\narticle.container {\n  background: #fff;\n  margin-top: 50px;\n  padding: 10px;\n  position: relative;\n}\n.navbar .nav > li {\n  border-left: 1px solid #060d18;\n}\n.navbar .nav > li > a {\n  color: rgba(255,255,255,0.8);\n  text-shadow: 1px 1px 0px rgba(0,0,0,0.8);\n  border-left: 1px solid #2d569a;\n  font-size: 13px;\n}\n.navbar .nav > li > a:hover {\n  color: #fff;\n}\n.navbar .nav li.dropdown.open>.dropdown-toggle,\n.navbar .nav li.dropdown.active>.dropdown-toggle,\n.navbar .nav li.dropdown.open.active>.dropdown-toggle {\n  background: transparent;\n  color: #fff;\n}\n.navbar .dropdown-menu {\n  border: none;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0;\n  padding: 10px;\n}\n.navbar .dropdown-menu form {\n  margin-bottom: 0;\n}\n.navbar .dropdown-menu input {\n  height: 30px;\n}\n.navbar .dropdown-menu button {\n  margin-top: 0;\n}\n.navbar .dropdown-menu .alert {\n  margin-bottom: 10px;\n  display: none;\n}\n#forgot-password {\n  line-height: 30px;\n}\n#forgot-form {\n  display: none;\n}\n/*\n * Index styles\n */\n.thumbs a {\n  text-decoration: none;\n}\n.thumb {\n  display: inline-block;\n  position: relative;\n  width: 133px;\n  height: 133px;\n  margin: 10px;\n  padding: 5px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  border: none;\n  -webkit-box-shadow: 0px 0px 5px rgba(0,0,0,0.2);\n  -moz-box-shadow: 0px 0px 5px rgba(0,0,0,0.2);\n  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\n/*\n *  Designer styles\n */\n#palette-wrapper {\n  position: relative;\n  border: 1px solid #ccc;\n  padding: 3px 1px 1px 3px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  -o-border-radius: 3px;\n  -ms-border-radius: 3px;\n  border-radius: 3px;\n  background: #fff;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#color-wrapper {\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  -o-border-radius: 3px;\n  -ms-border-radius: 3px;\n  border-radius: 3px;\n  border: 1px solid #ccc;\n  padding: 3px;\n  margin-bottom: 10px;\n}\n#palette,\n#palette:active {\n  cursor: hand;\n  cursor: pointer;\n}\n#color {\n  width: 132px;\n  height: 64px;\n}\n#toolbar .btn-group {\n  margin: 0 0 5px 0;\n}\n#meta {\n  padding-bottom: 10px;\n}\n#meta select {\n  margin: 0 10px;\n}\n#meta input {\n  margin-left: 10px;\n  width: 369px;\n}\n#save-button {\n  width: 100%;\n  margin-bottom: 10px;\n}\n#grid,\n#grid:active {\n  cursor: hand;\n  cursor: pointer;\n}\n/*\n * Bootstrap overrides\n */\n.alert {\n  margin-bottom: 0;\n}\n/*\n  * Utility classes\n  */\n.hidden {\n  display: none;\n}\n"; });
define('text!designer.html', ['module'], function(module) { module.exports = "<template>\n  <div id=\"editor\">\n    <div class=\"row\">\n      <div class=\"span2\">\n        <button click.trigger=\"save()\" class=\"btn btn-success\" id=\"save-button\">Save</button>\n\n        <div id=\"color-wrapper\">\n          <div id=\"color\"></div>\n        </div>\n\n        <div id=\"palette-wrapper\">\n          <canvas click.trigger=\"selectColor($event)\" id=\"palette\" width=\"133\" height=\"600\"></canvas>\n        </div>\n      </div>\n\n      <div class=\"span9\">\n        <div class=\"form-inline\" id=\"meta\">\n          <label>Width: </label>\n\n          <select value.bind=\"width\" class=\"input-mini\" id=\"width\" value=\"20\">\n            <option value=\"10\">10</option>\n          </select>\n\n          <label>Height: </label>\n\n          <select value.bind=\"height\" class=\"input-mini\" id=\"width\" value=\"20\">\n            <option value=\"10\">10</option>\n          </select>\n\n          <label>Name: </label>\n\n          <input value.bind=\"name\" type=\"text\" id=\"name\" placeholder=\"Pattern Name\">\n        </div>\n\n        <canvas mousemove.delegate=\"drag($event)\" mouseup.trigger=\"click($event)\" mousedown.trigger=\"startDrawing($event)\" mouseleave.trigger=\"stopDrawing($event)\" id=\"grid\" width=\"700\" height=\"700\"></canvas>\n      </div>\n\n      <div class=\"span1\" id=\"toolbar\">\n        <div class=\"btn-group btn-group-vertical\" data-toggle=\"buttons-radio\">\n          <button class=\"btn ${align == 'normal' ? 'active' : ''}\" click.delegate=\"setAlign('normal')\" id=\"align-normal\">\n            <img src=\"/images/align-normal.png\" width=\"30\" height=\"30\">\n          </button>\n          <button class=\"btn ${align == 'horizontal' ? 'active' : ''}\" click.delegate=\"setAlign('horizontal')\" id=\"align-horizontal\">\n            <img src=\"/images/align-horizontal.png\" width=\"30\" height=\"30\">\n          </button>\n          <button class=\"btn ${align == 'vertical' ? 'active' : ''}\" click.delegate=\"setAlign('vertical')\" id=\"align-vertical\">\n            <img src=\"/images/align-vertical.png\" width=\"30\" height=\"30\">\n          </button>\n        </div>\n\n        <div class=\"btn-group btn-group-vertical\" data-toggle=\"buttons-radio\">\n          <button class=\"btn ${mode == 'brush' ? 'active' : ''}\" click.delegate=\"setMode('brush')\" id=\"mode-brush\">\n            <img src=\"/images/brush.png\" width=\"30\" height=\"30\">\n          </button>\n          <button class=\"btn ${mode == 'fill' ? 'active' : ''}\" click.delegate=\"setMode('fill')\" id=\"mode-fill\">\n            <img src=\"/images/fill.png\" width=\"30\" height=\"30\">\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"palette-highlight\"></div>\n    <label id=\"save-error\"></label>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map