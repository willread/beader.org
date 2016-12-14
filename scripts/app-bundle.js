define('app',['exports', 'aurelia-router'], function (exports, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Contacts';
      config.map([{ route: '', moduleId: 'designer', title: 'Beader.org' }, { route: 'designer', moduleId: 'designer', name: 'designer' }]);

      this.router = router;
    };

    return App;
  }();
});
define('designer',['exports', 'aurelia-framework', 'aurelia-http-client'], function (exports, _aureliaFramework, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Designer = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Designer = exports.Designer = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
    function Designer(httpClient) {
      _classCallCheck(this, Designer);

      this.colors = ['000000', '002000', '003400', '006700', '009b00', '00ce00', '00ff00', '070707', '000035', '003333', '006731', '009b2c', '00ce23', '00ff10', '0e0e0e', '000068', '003268', '006667', '009a64', '00ce62', '00ff5d', '151515', '00009c', '002f9c', '00659b', '009a9a', '00cd98', '00ff95', '1c1c1c', '0000d0', '0029cf', '0063cf', '0099cf', '00cccd', '00ffcc', '232323', '0000ff', '0021ff', '0060ff', '0096ff', '00cbff', '00ffff', '2a2a2a', '340000', '333300', '316700', '2d9a00', '26ce00', '1bff00', '313131', '340034', '333333', '316731', '2d9a2b', '26ce22', '1aff0f', '383838', '330068', '333268', '306666', '2d9a64', '26ce61', '1aff5c', '3f3f3f', '32009b', '332f9c', '30649a', '2d999a', '25cd98', '19ff96', '464646', '3300d0', '3129cf', '3063cf', '2c99cf', '24cccd', '17ffcb', '4d4d4d', '3100ff', '3021ff', '2e60ff', '2a96ff', '23cbff', '15ffff', '545454', '670000', '673300', '676700', '649a00', '62ce00', '5fff00', '5b5b5b', '670033', '673332', '666730', '659a2a', '62ce21', '5eff0b', '626262', '670068', '673167', '666666', '649a64', '61cd60', '5eff5c', '696969', '67009c', '672e9c', '66659b', '64999a', '61cd97', '5eff95', '707070', '6600cf', '6729d0', '6663cf', '6498ce', '62cdcd', '5dffcb', '777777', '6700ff', '6621ff', '655fff', '6497ff', '61cbff', '5dffff', '7e7e7e', '9b0000', '9a3200', '9a6700', '999a00', '98ce00', '96ff00', '858585', '9a0031', '9b3230', '9a672e', '999a28', '98ce1e', '96ff05', '8c8c8c', '9b0067', '9a3066', '9a6665', '999a64', '97cd60', '95ff5b', '939393', '9b009b', '9a2d9a', '9a659a', '999999', '98cd97', '95ff94', '9a9a9a', '9a00cf', '9a28cf', '9a63cf', '9897cd', '97cccc', '95ffcb', 'a1a1a1', '9a00ff', '9a1fff', '995fff', '9997ff', '97cbff', '95ffff', 'a8a8a8', 'cf0000', 'cf3200', 'ce6600', 'cd9a00', 'cdce00', 'cbff00', 'afafaf', 'cf002e', 'ce312d', 'ce662a', 'cd9a24', 'cccd19', 'cbff00', 'b6b6b6', 'ce0065', 'ce3065', 'cd6563', 'cd9962', 'cccd5e', 'cbff5a', 'bdbdbd', 'ce009a', 'ce2d9a', 'cd6499', 'cd9998', 'cccc96', 'cbff94', 'c4c4c4', 'ce00cf', 'ce27ce', 'ce62ce', 'cd97cd', 'cccccc', 'cbffcb', 'cbcbcb', 'ce00ff', 'ce1eff', 'cd5fff', 'cd96ff', 'cccbff', 'caffff', 'd2d2d2', 'ff0000', 'ff3000', 'ff6600', 'ff9a00', 'ffce00', 'ffff00', 'd9d9d9', 'ff002a', 'ff3028', 'ff6525', 'ff991e', 'ffcd0f', 'ffff00', 'e0e0e0', 'ff0064', 'ff2e64', 'ff6563', 'ff9960', 'ffcd5d', 'ffff58', 'e7e7e7', 'ff0099', 'ff2b99', 'ff6398', 'ff9998', 'ffcd96', 'ffff92', 'eeeeee', 'ff00ce', 'ff25ce', 'ff61cd', 'ff98cd', 'ffcccb', 'ffffc9', 'f5f5f5', 'ff00ff', 'ff1cff', 'ff5eff', 'ff96ff', 'ffcbff', 'ffffff'];
      this.width = 10;
      this.height = 10;
      this.name = 'Untitled Pattern';
      this.align = 'normal';
      this.mode = 'brush';
      this.color = '000000';
      this.clearColor = 'ffffff';
      this.drawing = false;
      this.pattern = [];

      this.http = httpClient;
    }

    Designer.prototype.attached = function attached() {

      $('#color').css('backgroundColor', '#' + this.color);

      for (var ii = 0; ii < this.width * this.height; ii++) {
        this.pattern.push(this.clearColor);
      }

      this.renderPalette();
      this.renderGrid();
    };

    Designer.prototype.renderPalette = function renderPalette() {
      var palette = $('#palette')[0];
      var context = palette.getContext('2d');

      var width = ($(palette).width() - 1) / 7 - 1;
      var height = ($(palette).height() - 1) / 36 - 1;

      for (var y = 0; y < 36; y++) {
        for (var x = 0; x < 7; x++) {
          context.beginPath();
          context.fillStyle = '#' + this.colors[y * 7 + x];
          context.fillRect(x * (width + 1), y * (height + 1), width, height);
          context.strokeStyle = '#ffffff';
          context.lineWidth = 1;
          context.stroke();
        }
      }
    };

    Designer.prototype.selectColor = function selectColor($event) {
      var palette = $('#palette')[0];
      var context = palette.getContext('2d');

      var width = Math.floor(($(palette).width() - 1) / 7 - 1);
      var height = Math.floor(($(palette).height() - 1) / 36 - 1);

      var offsetX = $event.pageX - $(palette).offset().left;
      var offsetY = $event.pageY - $(palette).offset().top;

      var x = Math.floor(offsetX / (width + 1));
      var y = Math.floor(offsetY / (height + 1));

      this.color = this.colors[y * 7 + x];

      $('#color').css('backgroundColor', '#' + this.color);
    };

    Designer.prototype.setMode = function setMode(mode) {
      this.mode = mode;
    };

    Designer.prototype.setAlign = function setAlign(align) {
      this.align = align;
      this.renderGrid();
    };

    Designer.prototype.startDrawing = function startDrawing($event) {
      this.drawing = true;
    };

    Designer.prototype.stopDrawing = function stopDrawing($event) {
      this.drawing = false;
    };

    Designer.prototype.drag = function drag($event) {
      if (this.drawing && this.mode == 'brush') {
        this.draw($event);
      }
    };

    Designer.prototype.click = function click($event) {
      if (this.mode == 'brush') {
        this.stopDrawing($event);
        this.draw($event);
      }

      if (this.mode == 'fill') {
        var canvas = $('#grid')[0];
        var context = canvas.getContext('2d');

        var size = this.width > this.height ? $(canvas).width() / width : $(canvas).height() / this.height;
        var x = Math.floor($event.offsetX / size);
        var y = Math.floor($event.offsetY / size);

        this.fill($event, x, y);
      }
    };

    Designer.prototype.getPatternCell = function getPatternCell(x, y) {
      return this.pattern[x + y * this.width];
    };

    Designer.prototype.setPatternCell = function setPatternCell(x, y, color) {
      this.pattern[x + y * this.width] = color;
    };

    Designer.prototype.draw = function draw($event) {
      var canvas = $('#grid')[0];
      var context = canvas.getContext('2d');

      var size = this.width > this.height ? $(canvas).width() / width : $(canvas).height() / this.height;
      var x = Math.floor($event.offsetX / size);
      var y = Math.floor($event.offsetY / size);

      this.setPtternCell(x, y, this.color);
      this.renderGrid($event);
    };

    Designer.prototype.fill = function fill($event, x, y) {
      var oldColor = this.getPatternCell(x, y) || this.clearColor;
      if (oldColor == $.color) return;

      var stack = [[x, y]];

      while (stack.length) {

        var cell = stack.pop();
        var _x = cell[0];
        var _y = cell[1];

        this.setPatternCell(_x, _y, this.color);

        if (_x - 1 >= 0 && oldColor == (this.getPatternCell(_x - 1, _y) || 'ffffff')) stack.push([_x - 1, _y]);

        if (_x + 1 < this.width && oldColor == (this.getPatternCell(_x + 1, _y) || 'ffffff')) stack.push([_x + 1, _y]);

        if (_y - 1 >= 0 && oldColor == (this.getPatternCell(_x, _y - 1) || 'ffffff')) stack.push([_x, _y - 1]);

        if (_y + 1 < this.height && oldColor == (this.getPatternCell(_x, _y + 1) || 'ffffff')) stack.push([_x, _y + 1]);
      }

      this.renderGrid($event);
    };

    Designer.prototype.renderGrid = function renderGrid($event) {
      var canvas = $('#grid');
      var context = canvas[0].getContext('2d');

      var size = this.width > this.height ? canvas.width() / this.width : canvas.height() / this.height;

      if (this.align !== 'normal') {
        size = this.width > this.height ? size - size / this.width / 2 : size - size / this.height / 2;
      }

      var horizontalOffset = this.align == 'horizontal' ? size / 2 : 0;
      var verticalOffset = this.align == 'vertical' ? size / 2 : 0;

      canvas.attr('width', canvas.attr('width'));

      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          context.beginPath();
          context.arc(x * size + size / 2 + (y % 2 ? horizontalOffset : 0), y * size + size / 2 + (x % 2 ? verticalOffset : 0), size / 2 - 1, 0, 2 * Math.PI, false);
          context.fillStyle = '#' + (this.getPatternCell(x, y) || this.clearColor);
          context.fill();
          context.lineWidth = 1;
          context.strokeStyle = '#ddd';
          context.stroke();
        }
      }
    };

    Designer.prototype.save = function save() {
      $('#save-button').prop('disabled', true);
      $('#save-button').text('Saving...');

      var canvas = $('#grid');

      this.http.post('https://beader-api.herokuapp.com/patterns', {
        name: this.name,
        description: '',
        width: this.width,
        height: this.height,
        align: this.align,
        pattern: this.pattern,
        image: canvas[0].toDataURL('image/png')
      }).then(function (response) {
        $('#save-button').prop('disabled', false);
        $('#save-button').text('Save');
      }).catch(function (error) {
        alert('Error: ' + error);
      });
    };

    return Designer;
  }()) || _class);
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n\n  <header class=\"navbar navbar-fixed-top\">\n      <div class=\"navbar-inner\">\n          <div class=\"container\">\n              <a class=\"pull-left\" href=\"/\"><img src=\"/images/logo.png\"></a>\n              <ul class=\"nav pull-right\">\n                  <li><a href=\"/\">Pattern Gallery</a></li>\n                  <li><a href=\"/create\">Design a Pattern</a></li>\n                  <li ng-controller=\"AuthCtrl\" id=\"login-item\" class=\"dropdown\">\n                      <a ng-if=\"!user\" class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">Login</a>\n                      <a ng-if=\"user\" class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\">{{user.displayName}}</a>\n                      <div id=\"login\" class=\"dropdown-menu\">\n                          <a ng-if=\"!user\" ng-click=\"googleLogin()\" href=\"\" class=\"btn\">Login with Google</a>\n                          <a ng-if=\"user\" ng-click=\"googleLogout()\" href=\"\" class=\"btn\">Log Out</a>\n                      </div>\n                  </li>\n              </ul>\n          </div>\n      </div>\n  </header>\n  <router-view class=\"container\"></router-view>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body {\n  background: #666 url(\"../images/bg.png\");\n}\nheader .navbar-inner {\n  height: 40px;\n  background: #1d3966 url(\"../images/header.png\");\n  border-bottom: 1px solid #224;\n}\narticle.container {\n  background: #fff;\n  margin-top: 50px;\n  padding: 10px;\n  position: relative;\n}\n.navbar .nav > li {\n  border-left: 1px solid #060d18;\n}\n.navbar .nav > li > a {\n  color: rgba(255,255,255,0.8);\n  text-shadow: 1px 1px 0px rgba(0,0,0,0.8);\n  border-left: 1px solid #2d569a;\n  font-size: 13px;\n}\n.navbar .nav > li > a:hover {\n  color: #fff;\n}\n.navbar .nav li.dropdown.open>.dropdown-toggle,\n.navbar .nav li.dropdown.active>.dropdown-toggle,\n.navbar .nav li.dropdown.open.active>.dropdown-toggle {\n  background: transparent;\n  color: #fff;\n}\n.navbar .dropdown-menu {\n  border: none;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0;\n  padding: 10px;\n}\n.navbar .dropdown-menu form {\n  margin-bottom: 0;\n}\n.navbar .dropdown-menu input {\n  height: 30px;\n}\n.navbar .dropdown-menu button {\n  margin-top: 0;\n}\n.navbar .dropdown-menu .alert {\n  margin-bottom: 10px;\n  display: none;\n}\n#forgot-password {\n  line-height: 30px;\n}\n#forgot-form {\n  display: none;\n}\n/*\n * Index styles\n */\n.thumbs a {\n  text-decoration: none;\n}\n.thumb {\n  display: inline-block;\n  position: relative;\n  width: 133px;\n  height: 133px;\n  margin: 10px;\n  padding: 5px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  border: none;\n  -webkit-box-shadow: 0px 0px 5px rgba(0,0,0,0.2);\n  -moz-box-shadow: 0px 0px 5px rgba(0,0,0,0.2);\n  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\n/*\n *  Designer styles\n */\n#palette-wrapper {\n  position: relative;\n  border: 1px solid #ccc;\n  padding: 3px 1px 1px 3px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  -o-border-radius: 3px;\n  -ms-border-radius: 3px;\n  border-radius: 3px;\n  background: #fff;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#color-wrapper {\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  -o-border-radius: 3px;\n  -ms-border-radius: 3px;\n  border-radius: 3px;\n  border: 1px solid #ccc;\n  padding: 3px;\n  margin-bottom: 10px;\n}\n#palette,\n#palette:active {\n  cursor: hand;\n  cursor: pointer;\n}\n#color {\n  width: 132px;\n  height: 64px;\n}\n#toolbar .btn-group {\n  margin: 0 0 5px 0;\n}\n#meta {\n  padding-bottom: 10px;\n}\n#meta select {\n  margin: 0 10px;\n}\n#meta input {\n  margin-left: 10px;\n  width: 369px;\n}\n#save-button {\n  width: 100%;\n  margin-bottom: 10px;\n}\n#grid,\n#grid:active {\n  cursor: hand;\n  cursor: pointer;\n}\n/*\n * Bootstrap overrides\n */\n.alert {\n  margin-bottom: 0;\n}\n/*\n  * Utility classes\n  */\n.hidden {\n  display: none;\n}\n"; });
define('text!designer.html', ['module'], function(module) { module.exports = "<template>\n  <div id=\"editor\">\n    <div class=\"row\">\n      <div class=\"span2\">\n        <div id=\"color-wrapper\">\n          <div id=\"color\"></div>\n        </div>\n\n        <div id=\"palette-wrapper\">\n          <canvas click.trigger=\"selectColor($event)\" id=\"palette\" width=\"133\" height=\"600\"></canvas>\n        </div>\n      </div>\n\n      <div class=\"span9\">\n        <div class=\"form-inline\" id=\"meta\">\n          <label>Width: </label>\n\n          <select value.bind=\"width\" class=\"input-mini\" id=\"width\" value=\"20\">\n            <option value=\"10\">10</option>\n          </select>\n\n          <label>Height: </label>\n\n          <select value.bind=\"height\" class=\"input-mini\" id=\"width\" value=\"20\">\n            <option value=\"10\">10</option>\n          </select>\n\n          <label>Name: </label>\n\n          <input value.bind=\"name\" type=\"text\" id=\"name\" placeholder=\"Pattern Name\">\n        </div>\n\n        <canvas mousemove.delegate=\"drag($event)\" mouseup.trigger=\"click($event)\" mousedown.trigger=\"startDrawing($event)\" mouseleave.trigger=\"stopDrawing($event)\" id=\"grid\" width=\"700\" height=\"700\"></canvas>\n      </div>\n\n      <div class=\"span1\" id=\"toolbar\">\n        <div class=\"btn-group btn-group-vertical\" data-toggle=\"buttons-radio\">\n          <button class=\"btn ${align == 'normal' ? 'active' : ''}\" click.delegate=\"setAlign('normal')\" id=\"align-normal\">\n            <img src=\"/images/align-normal.png\" width=\"30\" height=\"30\">\n          </button>\n          <button class=\"btn ${align == 'horizontal' ? 'active' : ''}\" click.delegate=\"setAlign('horizontal')\" id=\"align-horizontal\">\n            <img src=\"/images/align-horizontal.png\" width=\"30\" height=\"30\">\n          </button>\n          <button class=\"btn ${align == 'vertical' ? 'active' : ''}\" click.delegate=\"setAlign('vertical')\" id=\"align-vertical\">\n            <img src=\"/images/align-vertical.png\" width=\"30\" height=\"30\">\n          </button>\n        </div>\n\n        <div class=\"btn-group btn-group-vertical\" data-toggle=\"buttons-radio\">\n          <button class=\"btn ${mode == 'brush' ? 'active' : ''}\" click.delegate=\"setMode('brush')\" id=\"mode-brush\">\n            <img src=\"/images/brush.png\" width=\"30\" height=\"30\">\n          </button>\n          <button class=\"btn ${mode == 'fill' ? 'active' : ''}\" click.delegate=\"setMode('fill')\" id=\"mode-fill\">\n            <img src=\"/images/fill.png\" width=\"30\" height=\"30\">\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"palette-highlight\"></div>\n    <label id=\"save-error\"></label>\n  </div>\n\n  <button click.trigger=\"save()\" class=\"btn btn-success\" id=\"save-button\">Save</button>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map