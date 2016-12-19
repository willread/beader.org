define('app',['exports', 'aurelia-router', 'aurelia-framework', 'aurelia-auth', 'jquery'], function (exports, _aureliaRouter, _aureliaFramework, _aureliaAuth) {
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

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaAuth.AuthService, _aureliaAuth.FetchConfig), _dec(_class = function () {
    function App(auth, fetchConfig) {
      _classCallCheck(this, App);

      this.user = '';

      this.auth = auth;
      this.fetchConfig = fetchConfig;
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Contacts';
      config.map([{ route: '', moduleId: 'patterns', title: 'Beader.org' }, { route: '/patterns', moduleId: 'patterns', title: 'Patterns', name: 'patterns' }, { route: '/pattern/:id', moduleId: 'pattern', name: 'pattern' }, { route: '/patterns/user/:id', moduleId: 'patternsByUser', name: 'patternsByUser' }, { route: '/designer', moduleId: 'designer', name: 'designer' }]);

      this.router = router;
    };

    App.prototype.activate = function activate() {
      this.fetchConfig.configure();
      this.fetchUser();
    };

    App.prototype.fetchUser = function fetchUser() {
      var _this = this;

      this.auth.getMe().then(function (user) {
        return _this.user = user;
      });
    };

    App.prototype.authenticate = function authenticate(name) {
      var _this2 = this;

      return this.auth.authenticate(name, false, null).then(function (response) {
        _this2.fetchUser();
      });
    };

    App.prototype.logout = function logout() {
      return this.auth.logout().then(function (response) {});
    };

    App.prototype.deactivate = function deactivate() {
      this.subscription.dispose();
    };

    _createClass(App, [{
      key: 'isAuthenticated',
      get: function get() {
        var isAuthenticated = this.auth.isAuthenticated();
        return isAuthenticated;
      }
    }]);

    return App;
  }()) || _class);
});
define('auth-config',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var config = {
    profileUrl: 'https://beader-api.herokuapp.com/auth',
    providers: {
      google: {
        clientId: '204545753423-3igb69ajb3be6ftc6mu8ftkgmvqe3hcv.apps.googleusercontent.com',
        url: 'https://beader-api.herokuapp.com/auth'
      }
    }
  };

  exports.default = config;
});
define('designer',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
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

  var Designer = exports.Designer = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Designer(http) {
      _classCallCheck(this, Designer);

      this.colors = ['000000', '412000', '451904', '5d1f0c', '4a1700', '490036', '48036c', '051e81', '0b0779', '1d295a', '004b59', '004800', '164000', '2c3500', '463a09', '401a02', '252525', '542800', '721e11', '7a240d', '721f00', '66004b', '5c0488', '0626a5', '201c8e', '1d3876', '005d6e', '005400', '1c5300', '384400', '4d3f09', '581f05', '343434', '763700', '9f241e', '982c0e', 'a81300', '80035f', '650d90', '082fca', '3531a3', '1d4892', '006f84', '036b03', '236600', '445200', '544509', '702408', '4e4e4e', '9a5000', 'b33a20', 'b02f0f', 'c8210a', '950f74', '7b23a7', '263dd4', '4642b4', '1d5cac', '00849c', '0e760e', '287800', '495600', '6c5809', '8d3a13', '686868', 'c36806', 'c85120', 'bf3624', 'df2512', 'aa2288', '933bbf', '444cde', '5753c5', '1d71c6', '0099bf', '188018', '2e8c00', '607100', '907609', 'ab511f', '757575', 'e47b07', 'e36920', 'd34e2a', 'ec3b24', 'ba3d99', '9d45c9', '4f5aec', '615dcf', '3286cf', '00abca', '279227', '3a980c', '6c7f00', 'ab8b0a', 'b56427', '8e8e8e', 'ff911a', 'fc8120', 'e7623e', 'fa5236', 'ca4da9', 'a74fd3', '5a68ff', '6d69db', '489bd9', '00bcde', '36a436', '47a519', '798d0a', 'c1a120', 'bf7730', 'a4a4a4', 'ffab1d', 'fd8c25', 'f36e4a', 'fc6148', 'd75ab6', 'b25ade', '6575ff', '7b77e9', '4ea8ec', '00d0f5', '4eb94e', '51af23', '8b9f1c', 'd0b02f', 'd0853a', 'b8b8b8', 'ffc51f', 'fe982c', 'fd7854', 'ff705f', 'e467c3', 'bd65e9', '7183ff', '8985f7', '55b6ff', '10dcff', '51cd51', '5cba2e', '9eb22f', 'debe3d', 'e19344', 'c5c5c5', 'ffd03b', 'ffae38', 'ff8a6a', 'ff7e7e', 'ef72ce', 'c56df1', '8091ff', '918dff', '69caff', '3ee1ff', '72da72', '71cf43', 'abbf3c', 'e6c645', 'eda04e', 'd0d0d0', 'ffd84c', 'ffb946', 'ff987c', 'ff8f8f', 'fb7eda', 'ce76fa', '90a0ff', '9c98ff', '74cbff', '64e7ff', '7ce47c', '85e357', 'b8cc49', 'edcd4c', 'f9ad58', 'd7d7d7', 'ffe651', 'ffbf51', 'ffa48b', 'ff9d9e', 'ff8de1', 'd583ff', '97a9ff', 'a7a4ff', '82d3ff', '76eaff', '85ed85', '8deb5f', 'c2d653', 'f5d862', 'fcb75c', 'e1e1e1', 'fff456', 'ffc66d', 'ffb39e', 'ffabad', 'ff9de5', 'da90ff', '9fb2ff', 'b2afff', '8ddaff', '8bedff', '99f299', '97f569', 'cde153', 'fbe276', 'ffc160', 'eaeaea', 'fff970', 'ffd587', 'ffc2b2', 'ffb9bd', 'ffa5e7', 'de9cff', 'afbeff', 'bbb8ff', '9fd4ff', '9aefff', 'b3f7b3', 'a0fe72', 'dbef6c', 'fcee98', 'ffca69', 'f4f4f4', 'ffff90', 'ffe498', 'ffd0c3', 'ffc7ce', 'ffafea', 'e2a9ff', 'c0cbff', 'c3c1ff', 'b4e2ff', 'b1f3ff', 'c3f9c3', 'b1ff8a', 'e8fc79', 'fdf3a9', 'ffcf7e', 'ffffff', 'ffffaa', 'ffe6ab', 'ffdad0', 'ffcade', 'ffb8ec', 'e6b6ff', 'cdd3ff', 'd3d1ff', 'c0ebff', 'c7f6ff', 'cdfccd', 'bcff9a', 'f2ffab', 'fdf3be', 'ffda96'];
      this.width = 10;
      this.height = 10;
      this.canvasWidth = 700;
      this.canvasHeight = 700;
      this.paletteWidth = 400;
      this.paletteHeight = 300;
      this.paletteCols = 16;
      this.paletteRows = 16;
      this.previousWidth = 10;
      this.previousHeight = 10;
      this.name = 'Untitled Pattern';
      this.align = 'normal';
      this.mode = 'brush';
      this.color = '000000';
      this.clearColor = 'ffffff';
      this.drawing = false;
      this.pattern = [];
      this.saving = false;

      this.http = http;
    }

    Designer.prototype.initPattern = function initPattern() {
      var newPattern = [];

      for (var ii = 0; ii < this.width * this.height; ii++) {
        newPattern.push(this.clearColor);
      }

      for (var _ii = 0; _ii < this.previousWidth; _ii++) {
        if (_ii >= this.width) break;
        for (var jj = 0; jj < this.previousHeight; jj++) {
          if (jj >= this.height) break;
          newPattern[_ii + jj * this.width] = this.pattern[_ii + jj * this.previousWidth];
        }
      }

      this.pattern = newPattern;
      this.previousWidth = this.width;
      this.previousHeight = this.height;
    };

    Designer.prototype.changePatternSize = function changePatternSize() {
      this.initPattern();
      this.renderGrid();
    };

    Designer.prototype.attached = function attached() {
      $('#color').css('backgroundColor', '#' + this.color);

      this.initPattern();
      this.renderGrid();
      this.renderPalette();
    };

    Designer.prototype.renderPalette = function renderPalette() {
      var palette = $('#palette')[0];
      var context = palette.getContext('2d');

      var width = (this.paletteWidth - 1) / this.paletteCols - 1;
      var height = (this.paletteHeight - 1) / this.paletteRows - 1;

      for (var y = 0; y < this.paletteRows; y++) {
        for (var x = 0; x < this.paletteCols; x++) {
          context.beginPath();
          context.fillStyle = '#' + this.colors[y * this.paletteCols + x];
          context.fillRect(x * (width + 1), y * (height + 1), width, height);
          context.strokeStyle = '#ffffff';
          context.lineWidth = 1;
          context.stroke();
        }
      }

      $('#palette-wrapper').addClass('hidden');
    };

    Designer.prototype.selectColor = function selectColor($event) {
      var palette = $('#palette')[0];
      var context = palette.getContext('2d');

      var width = Math.floor(this.paletteWidth / this.paletteCols);
      var height = Math.floor(this.paletteHeight / this.paletteRows);

      var offsetX = $event.pageX - $(palette).offset().left;
      var offsetY = $event.pageY - $(palette).offset().top;

      var x = Math.floor(offsetX / width);
      var y = Math.floor(offsetY / height);

      this.color = this.colors[y * this.paletteCols + x];

      $('#color').css('backgroundColor', '#' + this.color);
    };

    Designer.prototype.setMode = function setMode(mode) {
      this.mode = mode;
    };

    Designer.prototype.setAlign = function setAlign(align) {
      this.align = align;
      this.renderGrid();
    };

    Designer.prototype.startDrawing = function startDrawing() {
      this.drawing = true;
    };

    Designer.prototype.stopDrawing = function stopDrawing() {
      this.drawing = false;
    };

    Designer.prototype.drag = function drag($event) {
      if (this.drawing && this.mode == 'brush') {
        this.draw.apply(this, this.getXY($event));
      }
    };

    Designer.prototype.getXY = function getXY($event) {
      var canvas = $('#grid')[0];
      var size = this.width > this.height ? this.canvasWidth / this.width : this.canvasHeight / this.height;

      if (this.align !== 'normal') {
        size = this.width > this.height ? size - size / this.width / 2 : size - size / this.height / 2;
      }

      var x = void 0,
          y = void 0;
      var centeringOffset = (this.canvasWidth - size * this.width) / 2;

      if (this.align == 'horizontal') {
        y = Math.floor($event.offsetY / size);
        var horizontalOffset = !(y % 2) ? size / 2 : 0;
        centeringOffset -= size / 4;
        x = Math.floor(($event.offsetX - centeringOffset - horizontalOffset) / size);
        console.log(y, horizontalOffset, centeringOffset, x);
      }

      if (this.align == 'vertical') {
        x = Math.floor(($event.offsetX - centeringOffset) / size);
        var verticalOffset = x % 2 ? size / 2 : 0;
        y = Math.floor(($event.offsetY - verticalOffset) / size);
      }

      if (this.align == 'normal') {
        x = Math.floor(($event.offsetX - centeringOffset) / size);
        y = Math.floor($event.offsetY / size);
      }

      return [x, y];
    };

    Designer.prototype.click = function click($event) {
      if (this.mode == 'brush') {
        this.stopDrawing($event);
        this.draw.apply(this, this.getXY($event));
      }

      if (this.mode == 'fill') {
        this.fill.apply(this, this.getXY($event));
      }
    };

    Designer.prototype.getPatternCell = function getPatternCell(x, y) {
      return this.pattern[x + y * this.width];
    };

    Designer.prototype.setPatternCell = function setPatternCell(x, y, color) {
      this.pattern[x + y * this.width] = color;
    };

    Designer.prototype.draw = function draw(x, y) {
      var canvas = $('#grid')[0];
      var context = canvas.getContext('2d');

      this.setPatternCell(x, y, this.color);
      this.renderGrid();
    };

    Designer.prototype.fill = function fill(x, y) {
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

      this.renderGrid();
    };

    Designer.prototype.renderGrid = function renderGrid() {
      var canvas = $('#grid');
      var context = canvas[0].getContext('2d');

      var size = this.width > this.height ? this.canvasWidth / this.width : this.canvasHeight / this.height;

      if (this.align !== 'normal') {
        size = this.width > this.height ? size - size / this.width / 2 : size - size / this.height / 2;
      }

      var horizontalOffset = this.align == 'horizontal' ? size / 2 : 0;
      var verticalOffset = this.align == 'vertical' ? size / 2 : 0;
      var centeringOffset = (this.canvasWidth - size * this.width - horizontalOffset) / 2;

      canvas.attr('width', canvas.attr('width'));

      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          context.beginPath();
          context.arc(x * size + size / 2 + (!(y % 2) ? horizontalOffset : 0) + centeringOffset, y * size + size / 2 + (x % 2 ? verticalOffset : 0), size / 2 - 1, 0, 2 * Math.PI, false);
          context.fillStyle = '#' + (this.getPatternCell(x, y) || this.clearColor);
          context.fill();
          context.lineWidth = 1;
          context.strokeStyle = '#ddd';
          context.stroke();
        }
      }
    };

    Designer.prototype.save = function save() {
      var _this = this;

      this.saving = true;

      var canvas = $('#grid');
      var http = new _aureliaFetchClient.HttpClient();

      if (!this.pattern.find(function (cell) {
        return cell !== _this.pattern[0];
      })) {
        this.saving = false;
        return alert('Pattern must have more than one color!');
      }

      this.http.fetch('https://beader-api.herokuapp.com/patterns', {
        method: 'post',
        body: (0, _aureliaFetchClient.json)({
          name: this.name,
          description: '',
          width: this.width,
          height: this.height,
          align: this.align,
          pattern: this.pattern,
          image: canvas[0].toDataURL('image/png')
        })
      }).then(function (response) {
        $('#save-button').prop('disabled', false);
        $('#save-button').text('Save');
        _this.saving = false;
      }).catch(function (error) {
        alert('Error: ' + error);
        _this.saving = false;
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
define('main',['exports', './environment', './auth-config'], function (exports, _environment, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

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
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    });

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
define('pattern',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Pattern = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Pattern = exports.Pattern = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Pattern(http) {
      _classCallCheck(this, Pattern);

      this.pattern = {};
      this.errorMessage = null;

      this.http = http;
    }

    Pattern.prototype.activate = function activate(params, routeConfig) {
      var _this = this;

      this.http.fetch('https://beader-api.herokuapp.com/patterns/' + params.id).then(function (response) {
        return response.json();
      }).then(function (pattern) {
        _this.pattern = pattern;
        routeConfig.navModel.setTitle(pattern.name);
      }).catch(function (err) {
        return _this.errorMessage = 'Pattern not found.';
      });
    };

    return Pattern;
  }()) || _class);
});
define('patterns',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Patterns = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Patterns = exports.Patterns = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Patterns(http) {
      _classCallCheck(this, Patterns);

      this.patterns = [];
      this.page = 1;
      this.limit = 20;
      this.showNext = false;
      this.showPrevious = false;

      this.http = http;
    }

    Patterns.prototype.activate = function activate(params) {
      this.page = params.page ? parseInt(params.page, 10) : 1;
    };

    Patterns.prototype.determineActivationStrategy = function determineActivationStrategy() {
      return _aureliaRouter.activationStrategy.replace;
    };

    Patterns.prototype.attached = function attached() {
      var _this = this;

      this.http.fetch('https://beader-api.herokuapp.com/patterns?page=' + this.page + '&limit=' + this.limit).then(function (response) {
        return response.json();
      }).then(function (response) {
        _this.patterns = response.patterns;

        if (_this.page > 1) {
          _this.showPrevious = true;
        }
        if (_this.page < response.totalPages) {
          _this.showNext = true;
        }
      });
    };

    return Patterns;
  }()) || _class);
});
define('patternsByUser',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PatternsByUser = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var PatternsByUser = exports.PatternsByUser = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function PatternsByUser(http) {
      _classCallCheck(this, PatternsByUser);

      this.patterns = [];
      this.page = 1;
      this.limit = 20;
      this.showNext = false;
      this.showPrevious = false;

      this.http = http;
    }

    PatternsByUser.prototype.activate = function activate(params) {
      this.page = params.page ? parseInt(params.page, 10) : 1;
    };

    PatternsByUser.prototype.determineActivationStrategy = function determineActivationStrategy() {
      return _aureliaRouter.activationStrategy.replace;
    };

    PatternsByUser.prototype.activate = function activate(params, routeConfig) {
      var _this = this;

      this.http.fetch('https://beader-api.herokuapp.com/patterns/user/' + params.id + '?page=' + this.page + '&limit=' + this.limit).then(function (response) {
        return response.json();
      }).then(function (response) {
        _this.patterns = response.patterns;

        if (_this.page > 1) {
          _this.showPrevious = true;
        }
        if (_this.page < response.totalPages) {
          _this.showNext = true;
        }
      });
    };

    return PatternsByUser;
  }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('aurelia-auth/auth-service',['exports', 'aurelia-dependency-injection', 'aurelia-fetch-client', 'aurelia-event-aggregator', './authentication', './base-config', './oAuth1', './oAuth2', './auth-utilities'], function (exports, _aureliaDependencyInjection, _aureliaFetchClient, _aureliaEventAggregator, _authentication, _baseConfig, _oAuth, _oAuth2, _authUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthService = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AuthService = exports.AuthService = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaFetchClient.HttpClient, _authentication.Authentication, _oAuth.OAuth1, _oAuth2.OAuth2, _baseConfig.BaseConfig, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AuthService(http, auth, oAuth1, oAuth2, config, eventAggregator) {
      _classCallCheck(this, AuthService);

      this.http = http;
      this.auth = auth;
      this.oAuth1 = oAuth1;
      this.oAuth2 = oAuth2;
      this.config = config.current;
      this.tokenInterceptor = auth.tokenInterceptor;
      this.eventAggregator = eventAggregator;
    }

    AuthService.prototype.getMe = function getMe() {
      var profileUrl = this.auth.getProfileUrl();
      return this.http.fetch(profileUrl).then(_authUtilities.status);
    };

    AuthService.prototype.isAuthenticated = function isAuthenticated() {
      return this.auth.isAuthenticated();
    };

    AuthService.prototype.getTokenPayload = function getTokenPayload() {
      return this.auth.getPayload();
    };

    AuthService.prototype.setToken = function setToken(token) {
      this.auth.setToken(Object.defineProperty({}, this.config.tokenName, { value: token }));
    };

    AuthService.prototype.signup = function signup(displayName, email, password) {
      var _this = this;

      var signupUrl = this.auth.getSignupUrl();
      var content = void 0;
      if (_typeof(arguments[0]) === 'object') {
        content = arguments[0];
      } else {
        content = {
          'displayName': displayName,
          'email': email,
          'password': password
        };
      }

      return this.http.fetch(signupUrl, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(_authUtilities.status).then(function (response) {
        if (_this.config.loginOnSignup) {
          _this.auth.setToken(response);
        } else if (_this.config.signupRedirect) {
          window.location.href = _this.config.signupRedirect;
        }
        _this.eventAggregator.publish('auth:signup', response);
        return response;
      });
    };

    AuthService.prototype.login = function login(email, password) {
      var _this2 = this;

      var loginUrl = this.auth.getLoginUrl();
      var content = void 0;
      if (typeof arguments[1] !== 'string') {
        content = arguments[0];
      } else {
        content = {
          'email': email,
          'password': password
        };
      }

      return this.http.fetch(loginUrl, {
        method: 'post',
        headers: typeof content === 'string' ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {},
        body: typeof content === 'string' ? content : (0, _aureliaFetchClient.json)(content)
      }).then(_authUtilities.status).then(function (response) {
        _this2.auth.setToken(response);
        _this2.eventAggregator.publish('auth:login', response);
        return response;
      });
    };

    AuthService.prototype.logout = function logout(redirectUri) {
      var _this3 = this;

      return this.auth.logout(redirectUri).then(function () {
        _this3.eventAggregator.publish('auth:logout');
      });
    };

    AuthService.prototype.authenticate = function authenticate(name, redirect, userData) {
      var _this4 = this;

      var provider = this.oAuth2;
      if (this.config.providers[name].type === '1.0') {
        provider = this.oAuth1;
      }

      return provider.open(this.config.providers[name], userData || {}).then(function (response) {
        _this4.auth.setToken(response, redirect);
        _this4.eventAggregator.publish('auth:authenticate', response);
        return response;
      });
    };

    AuthService.prototype.unlink = function unlink(provider) {
      var _this5 = this;

      var unlinkUrl = this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, this.config.unlinkUrl) : this.config.unlinkUrl;

      if (this.config.unlinkMethod === 'get') {
        return this.http.fetch(unlinkUrl + provider).then(_authUtilities.status).then(function (response) {
          _this5.eventAggregator.publish('auth:unlink', response);
          return response;
        });
      } else if (this.config.unlinkMethod === 'post') {
        return this.http.fetch(unlinkUrl, {
          method: 'post',
          body: (0, _aureliaFetchClient.json)(provider)
        }).then(_authUtilities.status).then(function (response) {
          _this5.eventAggregator.publish('auth:unlink', response);
          return response;
        });
      }
    };

    return AuthService;
  }()) || _class);
});
define('aurelia-auth/authentication',['exports', 'aurelia-dependency-injection', './base-config', './storage', './auth-utilities'], function (exports, _aureliaDependencyInjection, _baseConfig, _storage, _authUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Authentication = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Authentication = exports.Authentication = (_dec = (0, _aureliaDependencyInjection.inject)(_storage.Storage, _baseConfig.BaseConfig), _dec(_class = function () {
    function Authentication(storage, config) {
      _classCallCheck(this, Authentication);

      this.storage = storage;
      this.config = config.current;
      this.tokenName = this.config.tokenPrefix ? this.config.tokenPrefix + '_' + this.config.tokenName : this.config.tokenName;
      this.idTokenName = this.config.tokenPrefix ? this.config.tokenPrefix + '_' + this.config.idTokenName : this.config.idTokenName;
    }

    Authentication.prototype.getLoginRoute = function getLoginRoute() {
      return this.config.loginRoute;
    };

    Authentication.prototype.getLoginRedirect = function getLoginRedirect() {
      return this.initialUrl || this.config.loginRedirect;
    };

    Authentication.prototype.getLoginUrl = function getLoginUrl() {
      return this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, this.config.loginUrl) : this.config.loginUrl;
    };

    Authentication.prototype.getSignupUrl = function getSignupUrl() {
      return this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, this.config.signupUrl) : this.config.signupUrl;
    };

    Authentication.prototype.getProfileUrl = function getProfileUrl() {
      return this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, this.config.profileUrl) : this.config.profileUrl;
    };

    Authentication.prototype.getToken = function getToken() {
      return this.storage.get(this.tokenName);
    };

    Authentication.prototype.getPayload = function getPayload() {
      var token = this.storage.get(this.tokenName);
      return this.decomposeToken(token);
    };

    Authentication.prototype.decomposeToken = function decomposeToken(token) {
      if (token && token.split('.').length === 3) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        try {
          return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
        } catch (error) {
          return null;
        }
      }
    };

    Authentication.prototype.setInitialUrl = function setInitialUrl(url) {
      this.initialUrl = url;
    };

    Authentication.prototype.setToken = function setToken(response, redirect) {
      var accessToken = response && response[this.config.responseTokenProp];
      var tokenToStore = void 0;

      if (accessToken) {
        if ((0, _authUtilities.isObject)(accessToken) && (0, _authUtilities.isObject)(accessToken.data)) {
          response = accessToken;
        } else if ((0, _authUtilities.isString)(accessToken)) {
          tokenToStore = accessToken;
        }
      }

      if (!tokenToStore && response) {
        tokenToStore = this.config.tokenRoot && response[this.config.tokenRoot] ? response[this.config.tokenRoot][this.config.tokenName] : response[this.config.tokenName];
      }

      if (tokenToStore) {
        this.storage.set(this.tokenName, tokenToStore);
      }

      var idToken = response && response[this.config.responseIdTokenProp];

      if (idToken) {
        this.storage.set(this.idTokenName, idToken);
      }

      if (this.config.loginRedirect && !redirect) {
        window.location.href = this.getLoginRedirect();
      } else if (redirect && (0, _authUtilities.isString)(redirect)) {
        window.location.href = window.encodeURI(redirect);
      }
    };

    Authentication.prototype.removeToken = function removeToken() {
      this.storage.remove(this.tokenName);
    };

    Authentication.prototype.isAuthenticated = function isAuthenticated() {
      var token = this.storage.get(this.tokenName);

      if (!token) {
        return false;
      }

      if (token.split('.').length !== 3) {
        return true;
      }

      var exp = void 0;
      try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        exp = JSON.parse(window.atob(base64)).exp;
      } catch (error) {
        return false;
      }

      if (exp) {
        return Math.round(new Date().getTime() / 1000) <= exp;
      }

      return true;
    };

    Authentication.prototype.logout = function logout(redirect) {
      var _this = this;

      return new Promise(function (resolve) {
        _this.storage.remove(_this.tokenName);

        if (_this.config.logoutRedirect && !redirect) {
          window.location.href = _this.config.logoutRedirect;
        } else if ((0, _authUtilities.isString)(redirect)) {
          window.location.href = redirect;
        }

        resolve();
      });
    };

    _createClass(Authentication, [{
      key: 'tokenInterceptor',
      get: function get() {
        var config = this.config;
        var storage = this.storage;
        var auth = this;
        return {
          request: function request(_request) {
            if (auth.isAuthenticated() && config.httpInterceptor) {
              var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
              var token = storage.get(tokenName);

              if (config.authHeader && config.authToken) {
                token = config.authToken + ' ' + token;
              }

              _request.headers.set(config.authHeader, token);
            }
            return _request;
          }
        };
      }
    }]);

    return Authentication;
  }()) || _class);
});
define('aurelia-auth/base-config',['exports', './auth-utilities'], function (exports, _authUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BaseConfig = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var BaseConfig = exports.BaseConfig = function () {
    BaseConfig.prototype.configure = function configure(incomingConfig) {
      (0, _authUtilities.merge)(this._current, incomingConfig);
    };

    _createClass(BaseConfig, [{
      key: 'current',
      get: function get() {
        return this._current;
      }
    }]);

    function BaseConfig() {
      _classCallCheck(this, BaseConfig);

      this._current = {
        httpInterceptor: true,
        loginOnSignup: true,
        baseUrl: '/',
        loginRedirect: '#/',
        logoutRedirect: '#/',
        signupRedirect: '#/login',
        loginUrl: '/auth/login',
        signupUrl: '/auth/signup',
        profileUrl: '/auth/me',
        loginRoute: '/login',
        signupRoute: '/signup',
        tokenRoot: false,
        tokenName: 'token',
        idTokenName: 'id_token',
        tokenPrefix: 'aurelia',
        responseTokenProp: 'access_token',
        responseIdTokenProp: 'id_token',
        unlinkUrl: '/auth/unlink/',
        unlinkMethod: 'get',
        authHeader: 'Authorization',
        authToken: 'Bearer',
        withCredentials: true,
        platform: 'browser',
        storage: 'localStorage',
        providers: {
          identSrv: {
            name: 'identSrv',
            url: '/auth/identSrv',

            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: ['profile', 'openid'],
            responseType: 'code',
            scopePrefix: '',
            scopeDelimiter: ' ',
            requiredUrlParams: ['scope', 'nonce'],
            optionalUrlParams: ['display', 'state'],
            state: function state() {
              var rand = Math.random().toString(36).substr(2);
              return encodeURIComponent(rand);
            },
            display: 'popup',
            type: '2.0',
            clientId: 'jsClient',
            nonce: function nonce() {
              var val = ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
              return encodeURIComponent(val);
            },
            popupOptions: { width: 452, height: 633 }
          },
          google: {
            name: 'google',
            url: '/auth/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display', 'state'],
            display: 'popup',
            type: '2.0',
            state: function state() {
              var rand = Math.random().toString(36).substr(2);
              return encodeURIComponent(rand);
            },
            popupOptions: {
              width: 452,
              height: 633
            }
          },
          facebook: {
            name: 'facebook',
            url: '/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
            redirectUri: window.location.origin + '/' || window.location.protocol + '//' + window.location.host + '/',
            scope: ['email'],
            scopeDelimiter: ',',
            nonce: function nonce() {
              return Math.random();
            },
            requiredUrlParams: ['nonce', 'display', 'scope'],
            display: 'popup',
            type: '2.0',
            popupOptions: {
              width: 580,
              height: 400
            }
          },
          linkedin: {
            name: 'linkedin',
            url: '/auth/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            requiredUrlParams: ['state'],
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            state: 'STATE',
            type: '2.0',
            popupOptions: {
              width: 527,
              height: 582
            }
          },
          github: {
            name: 'github',
            url: '/auth/github',
            authorizationEndpoint: 'https://github.com/login/oauth/authorize',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            optionalUrlParams: ['scope'],
            scope: ['user:email'],
            scopeDelimiter: ' ',
            type: '2.0',
            popupOptions: {
              width: 1020,
              height: 618
            }
          },
          yahoo: {
            name: 'yahoo',
            url: '/auth/yahoo',
            authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: [],
            scopeDelimiter: ',',
            type: '2.0',
            popupOptions: {
              width: 559,
              height: 519
            }
          },
          twitter: {
            name: 'twitter',
            url: '/auth/twitter',
            authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
            type: '1.0',
            popupOptions: {
              width: 495,
              height: 645
            }
          },
          live: {
            name: 'live',
            url: '/auth/live',
            authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: ['wl.emails'],
            scopeDelimiter: ' ',
            requiredUrlParams: ['display', 'scope'],
            display: 'popup',
            type: '2.0',
            popupOptions: {
              width: 500,
              height: 560
            }
          },
          instagram: {
            name: 'instagram',
            url: '/auth/instagram',
            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            requiredUrlParams: ['scope'],
            scope: ['basic'],
            scopeDelimiter: '+',
            display: 'popup',
            type: '2.0',
            popupOptions: {
              width: 550,
              height: 369
            }
          }
        }
      };
    }

    return BaseConfig;
  }();
});
define('aurelia-auth/auth-utilities',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.status = status;
  exports.isDefined = isDefined;
  exports.camelCase = camelCase;
  exports.parseQueryString = parseQueryString;
  exports.isString = isString;
  exports.isObject = isObject;
  exports.isFunction = isFunction;
  exports.joinUrl = joinUrl;
  exports.isBlankObject = isBlankObject;
  exports.isArrayLike = isArrayLike;
  exports.isWindow = isWindow;
  exports.extend = extend;
  exports.merge = merge;
  exports.forEach = forEach;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var slice = [].slice;

  function setHashKey(obj, h) {
    if (h) {
      obj.$$hashKey = h;
    } else {
      delete obj.$$hashKey;
    }
  }

  function baseExtend(dst, objs, deep) {
    var h = dst.$$hashKey;

    for (var i = 0, ii = objs.length; i < ii; ++i) {
      var obj = objs[i];
      if (!isObject(obj) && !isFunction(obj)) continue;
      var keys = Object.keys(obj);
      for (var j = 0, jj = keys.length; j < jj; j++) {
        var key = keys[j];
        var src = obj[key];

        if (deep && isObject(src)) {
          if (!isObject(dst[key])) dst[key] = Array.isArray(src) ? [] : {};
          baseExtend(dst[key], [src], true);
        } else {
          dst[key] = src;
        }
      }
    }

    setHashKey(dst, h);
    return dst;
  }

  function status(response) {
    if (response.status >= 200 && response.status < 400) {
      return response.json().catch(function (error) {
        return null;
      });
    }

    throw response;
  }

  function isDefined(value) {
    return typeof value !== 'undefined';
  }

  function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    });
  }

  function parseQueryString(keyValue) {
    var key = void 0;
    var value = void 0;
    var obj = {};

    forEach((keyValue || '').split('&'), function (kv) {
      if (kv) {
        value = kv.split('=');
        key = decodeURIComponent(value[0]);
        obj[key] = isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
      }
    });

    return obj;
  }

  function isString(value) {
    return typeof value === 'string';
  }

  function isObject(value) {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
  }

  function isFunction(value) {
    return typeof value === 'function';
  }

  function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
      return url;
    }

    var joined = [baseUrl, url].join('/');
    var normalize = function normalize(str) {
      return str.replace(/[\/]+/g, '/').replace(/\/\?/g, '?').replace(/\/\#/g, '#').replace(/\:\//g, '://');
    };

    return normalize(joined);
  }

  function isBlankObject(value) {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Object.getPrototypeOf(value);
  }

  function isArrayLike(obj) {
    if (obj === null || isWindow(obj)) {
      return false;
    }
  }

  function isWindow(obj) {
    return obj && obj.window === obj;
  }

  function extend(dst) {
    return baseExtend(dst, slice.call(arguments, 1), false);
  }

  function merge(dst) {
    return baseExtend(dst, slice.call(arguments, 1), true);
  }

  function forEach(obj, iterator, context) {
    var key = void 0;
    var length = void 0;
    if (obj) {
      if (isFunction(obj)) {
        for (key in obj) {
          if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else if (Array.isArray(obj) || isArrayLike(obj)) {
        var isPrimitive = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object';
        for (key = 0, length = obj.length; key < length; key++) {
          if (isPrimitive || key in obj) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context, obj);
      } else if (isBlankObject(obj)) {
        for (key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      } else if (typeof obj.hasOwnProperty === 'function') {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else {
        for (key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      }
    }
    return obj;
  }
});
define('aurelia-auth/storage',['exports', 'aurelia-dependency-injection', './base-config'], function (exports, _aureliaDependencyInjection, _baseConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Storage = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Storage = exports.Storage = (_dec = (0, _aureliaDependencyInjection.inject)(_baseConfig.BaseConfig), _dec(_class = function () {
    function Storage(config) {
      _classCallCheck(this, Storage);

      this.config = config.current;
      this.storage = this._getStorage(this.config.storage);
    }

    Storage.prototype.get = function get(key) {
      return this.storage.getItem(key);
    };

    Storage.prototype.set = function set(key, value) {
      return this.storage.setItem(key, value);
    };

    Storage.prototype.remove = function remove(key) {
      return this.storage.removeItem(key);
    };

    Storage.prototype._getStorage = function _getStorage(type) {
      if (type === 'localStorage') {
        if ('localStorage' in window && window.localStorage !== null) return localStorage;
        throw new Error('Local Storage is disabled or unavailable.');
      } else if (type === 'sessionStorage') {
        if ('sessionStorage' in window && window.sessionStorage !== null) return sessionStorage;
        throw new Error('Session Storage is disabled or unavailable.');
      }

      throw new Error('Invalid storage type specified: ' + type);
    };

    return Storage;
  }()) || _class);
});
define('aurelia-auth/oAuth1',['exports', 'aurelia-dependency-injection', './auth-utilities', './storage', './popup', './base-config', 'aurelia-fetch-client'], function (exports, _aureliaDependencyInjection, _authUtilities, _storage, _popup, _baseConfig, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OAuth1 = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var OAuth1 = exports.OAuth1 = (_dec = (0, _aureliaDependencyInjection.inject)(_storage.Storage, _popup.Popup, _aureliaFetchClient.HttpClient, _baseConfig.BaseConfig), _dec(_class = function () {
    function OAuth1(storage, popup, http, config) {
      _classCallCheck(this, OAuth1);

      this.storage = storage;
      this.config = config.current;
      this.popup = popup;
      this.http = http;
      this.defaults = {
        url: null,
        name: null,
        popupOptions: null,
        redirectUri: null,
        authorizationEndpoint: null
      };
    }

    OAuth1.prototype.open = function open(options, userData) {
      var _this = this;

      var current = (0, _authUtilities.extend)({}, this.defaults, options);
      var serverUrl = this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, current.url) : current.url;

      if (this.config.platform !== 'mobile') {
        this.popup = this.popup.open('', current.name, current.popupOptions, current.redirectUri);
      }
      return this.http.fetch(serverUrl, {
        method: 'post'
      }).then(_authUtilities.status).then(function (response) {
        if (_this.config.platform === 'mobile') {
          _this.popup = _this.popup.open([current.authorizationEndpoint, _this.buildQueryString(response)].join('?'), current.name, current.popupOptions, current.redirectUri);
        } else {
          _this.popup.popupWindow.location = [current.authorizationEndpoint, _this.buildQueryString(response)].join('?');
        }

        var popupListener = _this.config.platform === 'mobile' ? _this.popup.eventListener(current.redirectUri) : _this.popup.pollPopup();
        return popupListener.then(function (result) {
          return _this.exchangeForToken(result, userData, current);
        });
      });
    };

    OAuth1.prototype.exchangeForToken = function exchangeForToken(oauthData, userData, current) {
      var data = (0, _authUtilities.extend)({}, userData, oauthData);
      var exchangeForTokenUrl = this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, current.url) : current.url;
      var credentials = this.config.withCredentials ? 'include' : 'same-origin';

      return this.http.fetch(exchangeForTokenUrl, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(data),
        credentials: credentials
      }).then(_authUtilities.status);
    };

    OAuth1.prototype.buildQueryString = function buildQueryString(obj) {
      var str = [];
      (0, _authUtilities.forEach)(obj, function (value, key) {
        return str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      });
      return str.join('&');
    };

    return OAuth1;
  }()) || _class);
});
define('aurelia-auth/popup',['exports', './auth-utilities', './base-config', 'aurelia-dependency-injection'], function (exports, _authUtilities, _baseConfig, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Popup = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Popup = exports.Popup = (_dec = (0, _aureliaDependencyInjection.inject)(_baseConfig.BaseConfig), _dec(_class = function () {
    function Popup(config) {
      _classCallCheck(this, Popup);

      this.config = config.current;
      this.popupWindow = null;
      this.polling = null;
      this.url = '';
    }

    Popup.prototype.open = function open(url, windowName, options, redirectUri) {
      this.url = url;
      var optionsString = this.stringifyOptions(this.prepareOptions(options || {}));
      this.popupWindow = window.open(url, windowName, optionsString);
      if (this.popupWindow && this.popupWindow.focus) {
        this.popupWindow.focus();
      }

      return this;
    };

    Popup.prototype.eventListener = function eventListener(redirectUri) {
      var self = this;
      var promise = new Promise(function (resolve, reject) {
        self.popupWindow.addEventListener('loadstart', function (event) {
          if (event.url.indexOf(redirectUri) !== 0) {
            return;
          }

          var parser = document.createElement('a');
          parser.href = event.url;

          if (parser.search || parser.hash) {
            var queryParams = parser.search.substring(1).replace(/\/$/, '');
            var hashParams = parser.hash.substring(1).replace(/\/$/, '');
            var hash = (0, _authUtilities.parseQueryString)(hashParams);
            var qs = (0, _authUtilities.parseQueryString)(queryParams);

            (0, _authUtilities.extend)(qs, hash);

            if (qs.error) {
              reject({
                error: qs.error
              });
            } else {
              resolve(qs);
            }

            self.popupWindow.close();
          }
        });

        popupWindow.addEventListener('exit', function () {
          reject({
            data: 'Provider Popup was closed'
          });
        });

        popupWindow.addEventListener('loaderror', function () {
          deferred.reject({
            data: 'Authorization Failed'
          });
        });
      });
      return promise;
    };

    Popup.prototype.pollPopup = function pollPopup() {
      var _this = this;

      var self = this;
      var promise = new Promise(function (resolve, reject) {
        _this.polling = setInterval(function () {
          try {
            var documentOrigin = document.location.host;
            var popupWindowOrigin = self.popupWindow.location.host;

            if (popupWindowOrigin === documentOrigin && (self.popupWindow.location.search || self.popupWindow.location.hash)) {
              var queryParams = self.popupWindow.location.search.substring(1).replace(/\/$/, '');
              var hashParams = self.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
              var hash = (0, _authUtilities.parseQueryString)(hashParams);
              var qs = (0, _authUtilities.parseQueryString)(queryParams);

              (0, _authUtilities.extend)(qs, hash);

              if (qs.error) {
                reject({
                  error: qs.error
                });
              } else {
                resolve(qs);
              }

              self.popupWindow.close();
              clearInterval(self.polling);
            }
          } catch (error) {}

          if (!self.popupWindow) {
            clearInterval(self.polling);
            reject({
              data: 'Provider Popup Blocked'
            });
          } else if (self.popupWindow.closed) {
            clearInterval(self.polling);
            reject({
              data: 'Problem poll popup'
            });
          }
        }, 35);
      });
      return promise;
    };

    Popup.prototype.prepareOptions = function prepareOptions(options) {
      var width = options.width || 500;
      var height = options.height || 500;
      return (0, _authUtilities.extend)({
        width: width,
        height: height,
        left: window.screenX + (window.outerWidth - width) / 2,
        top: window.screenY + (window.outerHeight - height) / 2.5
      }, options);
    };

    Popup.prototype.stringifyOptions = function stringifyOptions(options) {
      var parts = [];
      (0, _authUtilities.forEach)(options, function (value, key) {
        parts.push(key + '=' + value);
      });
      return parts.join(',');
    };

    return Popup;
  }()) || _class);
});
define('aurelia-auth/oAuth2',['exports', 'aurelia-dependency-injection', './auth-utilities', './storage', './popup', './base-config', './authentication', 'aurelia-fetch-client'], function (exports, _aureliaDependencyInjection, _authUtilities, _storage, _popup, _baseConfig, _authentication, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OAuth2 = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var OAuth2 = exports.OAuth2 = (_dec = (0, _aureliaDependencyInjection.inject)(_storage.Storage, _popup.Popup, _aureliaFetchClient.HttpClient, _baseConfig.BaseConfig, _authentication.Authentication), _dec(_class = function () {
    function OAuth2(storage, popup, http, config, auth) {
      _classCallCheck(this, OAuth2);

      this.storage = storage;
      this.config = config.current;
      this.popup = popup;
      this.http = http;
      this.auth = auth;
      this.defaults = {
        url: null,
        name: null,
        state: null,
        scope: null,
        scopeDelimiter: null,
        redirectUri: null,
        popupOptions: null,
        authorizationEndpoint: null,
        responseParams: null,
        requiredUrlParams: null,
        optionalUrlParams: null,
        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
        responseType: 'code'
      };
    }

    OAuth2.prototype.open = function open(options, userData) {
      var _this = this;

      var current = (0, _authUtilities.extend)({}, this.defaults, options);

      var stateName = current.name + '_state';

      if ((0, _authUtilities.isFunction)(current.state)) {
        this.storage.set(stateName, current.state());
      } else if ((0, _authUtilities.isString)(current.state)) {
        this.storage.set(stateName, current.state);
      }

      var nonceName = current.name + '_nonce';

      if ((0, _authUtilities.isFunction)(current.nonce)) {
        this.storage.set(nonceName, current.nonce());
      } else if ((0, _authUtilities.isString)(current.nonce)) {
        this.storage.set(nonceName, current.nonce);
      }

      var url = current.authorizationEndpoint + '?' + this.buildQueryString(current);

      var openPopup = void 0;
      if (this.config.platform === 'mobile') {
        openPopup = this.popup.open(url, current.name, current.popupOptions, current.redirectUri).eventListener(current.redirectUri);
      } else {
        openPopup = this.popup.open(url, current.name, current.popupOptions, current.redirectUri).pollPopup();
      }

      return openPopup.then(function (oauthData) {
        if (oauthData.state && oauthData.state !== _this.storage.get(stateName)) {
          return Promise.reject('OAuth 2.0 state parameter mismatch.');
        }

        if (current.responseType.toUpperCase().indexOf('TOKEN') !== -1) {
          if (!_this.verifyIdToken(oauthData, current.name)) {
            return Promise.reject('OAuth 2.0 Nonce parameter mismatch.');
          }

          return oauthData;
        }

        return _this.exchangeForToken(oauthData, userData, current);
      });
    };

    OAuth2.prototype.verifyIdToken = function verifyIdToken(oauthData, providerName) {
      var idToken = oauthData && oauthData[this.config.responseIdTokenProp];
      if (!idToken) return true;
      var idTokenObject = this.auth.decomposeToken(idToken);
      if (!idTokenObject) return true;
      var nonceFromToken = idTokenObject.nonce;
      if (!nonceFromToken) return true;
      var nonceInStorage = this.storage.get(providerName + '_nonce');
      if (nonceFromToken !== nonceInStorage) {
        return false;
      }
      return true;
    };

    OAuth2.prototype.exchangeForToken = function exchangeForToken(oauthData, userData, current) {
      var data = (0, _authUtilities.extend)({}, userData, {
        code: oauthData.code,
        clientId: current.clientId,
        redirectUri: current.redirectUri
      });

      if (oauthData.state) {
        data.state = oauthData.state;
      }

      (0, _authUtilities.forEach)(current.responseParams, function (param) {
        return data[param] = oauthData[param];
      });

      var exchangeForTokenUrl = this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, current.url) : current.url;
      var credentials = this.config.withCredentials ? 'include' : 'same-origin';

      return this.http.fetch(exchangeForTokenUrl, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(data),
        credentials: credentials
      }).then(_authUtilities.status);
    };

    OAuth2.prototype.buildQueryString = function buildQueryString(current) {
      var _this2 = this;

      var keyValuePairs = [];
      var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];

      (0, _authUtilities.forEach)(urlParams, function (params) {
        (0, _authUtilities.forEach)(current[params], function (paramName) {
          var camelizedName = (0, _authUtilities.camelCase)(paramName);
          var paramValue = (0, _authUtilities.isFunction)(current[paramName]) ? current[paramName]() : current[camelizedName];

          if (paramName === 'state') {
            var stateName = current.name + '_state';
            paramValue = encodeURIComponent(_this2.storage.get(stateName));
          }

          if (paramName === 'nonce') {
            var nonceName = current.name + '_nonce';
            paramValue = encodeURIComponent(_this2.storage.get(nonceName));
          }

          if (paramName === 'scope' && Array.isArray(paramValue)) {
            paramValue = paramValue.join(current.scopeDelimiter);

            if (current.scopePrefix) {
              paramValue = [current.scopePrefix, paramValue].join(current.scopeDelimiter);
            }
          }

          keyValuePairs.push([paramName, paramValue]);
        });
      });

      return keyValuePairs.map(function (pair) {
        return pair.join('=');
      }).join('&');
    };

    return OAuth2;
  }()) || _class);
});
define('aurelia-auth/authorize-step',['exports', 'aurelia-dependency-injection', 'aurelia-router', './authentication'], function (exports, _aureliaDependencyInjection, _aureliaRouter, _authentication) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthorizeStep = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AuthorizeStep = exports.AuthorizeStep = (_dec = (0, _aureliaDependencyInjection.inject)(_authentication.Authentication), _dec(_class = function () {
    function AuthorizeStep(auth) {
      _classCallCheck(this, AuthorizeStep);

      this.auth = auth;
    }

    AuthorizeStep.prototype.run = function run(routingContext, next) {
      var isLoggedIn = this.auth.isAuthenticated();
      var loginRoute = this.auth.getLoginRoute();

      if (routingContext.getAllInstructions().some(function (i) {
        return i.config.auth;
      })) {
        if (!isLoggedIn) {
          this.auth.setInitialUrl(window.location.href);
          return next.cancel(new _aureliaRouter.Redirect(loginRoute));
        }
      } else if (isLoggedIn && routingContext.getAllInstructions().some(function (i) {
        return i.fragment === loginRoute;
      })) {
        var loginRedirect = this.auth.getLoginRedirect();
        return next.cancel(new _aureliaRouter.Redirect(loginRedirect));
      }

      return next();
    };

    return AuthorizeStep;
  }()) || _class);
});
define('aurelia-auth/auth-fetch-config',['exports', 'aurelia-dependency-injection', 'aurelia-fetch-client', './authentication'], function (exports, _aureliaDependencyInjection, _aureliaFetchClient, _authentication) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FetchConfig = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var FetchConfig = exports.FetchConfig = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaFetchClient.HttpClient, _authentication.Authentication), _dec(_class = function () {
    function FetchConfig(httpClient, authService) {
      _classCallCheck(this, FetchConfig);

      this.httpClient = httpClient;
      this.auth = authService;
    }

    FetchConfig.prototype.configure = function configure() {
      var _this = this;

      this.httpClient.configure(function (httpConfig) {
        httpConfig.withDefaults({
          headers: {
            'Accept': 'application/json'
          }
        }).withInterceptor(_this.auth.tokenInterceptor);
      });
    };

    return FetchConfig;
  }()) || _class);
});
define('aurelia-auth/auth-filter',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AuthFilterValueConverter = exports.AuthFilterValueConverter = function () {
    function AuthFilterValueConverter() {
      _classCallCheck(this, AuthFilterValueConverter);
    }

    AuthFilterValueConverter.prototype.toView = function toView(routes, isAuthenticated) {
      return routes.filter(function (r) {
        return r.config.auth === undefined || r.config.auth === isAuthenticated;
      });
    };

    return AuthFilterValueConverter;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./styles.css\"></require>\n\n  <header class=\"navbar\">\n    <div class=\"logo\">beader</div>\n\n    <div class=\"menu-left\">\n      <a href=\"/#\">Pattern Gallery</a>\n      <a route-href=\"route: designer\">New Pattern</a>\n      <span if.bind=\"isAuthenticated\">\n        <a route-href=\"route: patternsByUser; params.bind: {id: user._id}\">My Patterns</a>\n      </span>\n    </div>\n\n    <div class=\"menu-right\">\n      <a if.bind=\"!isAuthenticated\" click.delegate=\"authenticate('google')\">Sign in with Google</a>\n      <span if.bind=\"isAuthenticated\">\n        <span class=\"label\">Welcome ${user.displayName}</span>\n        <a click.trigger=\"logout()\">Log Out</a>\n      </span>\n    </div>\n  </header>\n  <router-view class=\"container\"></router-view>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Muli:900|Roboto:300,600,900\");\nbody {\n  margin: 0;\n  padding: 0;\n  background: #ccc;\n  color: #202121;\n  font-family: 'Roboto', sans-serif;\n}\n*,\ninput {\n  box-sizing: border-box;\n}\na,\na:active,\na:visited {\n  color: #202121;\n  font-size: 13px;\n}\n.navbar {\n  position: relative;\n  width: 100%;\n  height: 70px;\n  background: #fff;\n  border-bottom: 1px solid #aaa;\n}\n.navbar .logo {\n  font-size: 32px;\n  color: #00b7e6;\n  font-family: Muli, Sans-serif;\n  font-weight: 900;\n  letter-spacing: -1px;\n  background: -webkit-linear-gradient(#00d8d6, #00b7e6);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  text-align: center;\n  line-height: 70px;\n}\n.navbar .menu-left {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.navbar .menu-left a {\n  display: inline-block;\n  font-size: 12px;\n  line-height: 69px;\n  text-decoration: none;\n  text-transform: uppercase;\n  color: #333;\n  font-weight: 600;\n  padding: 0 20px;\n  border-right: 1px solid #eee;\n  float: left;\n}\n.navbar .menu-left a:hover {\n  background: #c7f4ff;\n  color: #0092b8;\n  cursor: hand;\n  cursor: pointer;\n}\n.navbar .menu-right {\n  height: 30px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin: 20px;\n}\n.navbar .menu-right .label {\n  display: inline-block;\n  color: #ccc;\n  font-size: 12px;\n  font-weight: 300;\n  padding-right: 10px;\n}\n.navbar .menu-right a {\n  display: inline-block;\n  color: #333;\n  font-size: 12px;\n  padding: 0 10px;\n  line-height: 28px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  font-weight: 600;\n  text-transform: uppercase;\n  cursor: hand;\n  cursor: pointer;\n}\n.navbar .menu-right a:hover {\n  background: #c7f4ff;\n  color: #0092b8;\n  border-color: #0092b8;\n}\n.pattern-tiles-container {\n  margin-top: 10px;\n  margin-left: 10px;\n}\n.pattern-tile {\n  width: 170px;\n  height: 230px;\n  padding: 10px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  background: #fff;\n  float: left;\n  border-radius: 2px;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.3);\n  text-decoration: none;\n}\n.pattern-tile img {\n  width: 150px;\n  height: 150px;\n}\n.pattern-tile-name {\n  font-size: 13px;\n  margin-top: 5px;\n  font-weight: 600;\n  line-height: 16px;\n  max-height: 32px;\n  overflow: hidden;\n}\n.pattern-tile-user {\n  font-size: 12px;\n  font-weight: 300;\n  line-height: 15px;\n  max-height: 15px;\n  overflow: hidden;\n  margin: 5px 0;\n}\na:hover .pattern-tile-name {\n  color: #0092b8;\n}\n.tools {\n  background: #666;\n  width: 100%;\n  height: 60px;\n  padding: 10px;\n  box-shadow: inset 0px 0px 5px rgba(0,0,0,0.3);\n  border-bottom: 1px solid #ddd;\n}\n.tools .right {\n  float: right;\n}\n.tools .label {\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 900;\n  color: #aaa;\n  line-height: 40px;\n  margin: 0 10px;\n  float: left;\n}\n.tools input {\n  border: 1px solid #ccc;\n  border-radius: 3px;\n  height: 42px;\n  float: left;\n  padding: 13px 8px;\n  box-shadow: none;\n  background: #fff;\n  -webkit-appearance: none;\n  font-size: 14px;\n  line-height: 14px;\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.tools input:focus {\n  outline: none;\n}\n.tools .select {\n  border: 1px solid #ccc;\n  width: 50px;\n  border-radius: 3px;\n  overflow: hidden;\n  background: #fff url(\"/images/arrowdown.gif\") no-repeat 90% 50%;\n  float: left;\n}\n.tools .select select {\n  padding: 13px 8px;\n  width: 50px;\n  border: none;\n  box-shadow: none;\n  background: transparent;\n  background-image: none;\n  -webkit-appearance: none;\n  font-size: 14px;\n  line-height: 14px;\n}\n.tools .select select:focus {\n  outline: none;\n}\n.tools .button-group {\n  margin-right: 10px;\n  float: left;\n  border-radius: 2px;\n  overflow: hidden;\n  border: 1px solid #fff;\n  position: relative;\n}\n.tools .button-group button {\n  display: inline-block;\n  float: left;\n  width: 60px;\n  height: 40px;\n  outline: none;\n  border-top: 0;\n  border-left: 0;\n  border-bottom: 0;\n  border-right: 1px solid #fff;\n}\n.tools .button-group button:last-child {\n  border-right: 0;\n}\n.tools .button-group button.active {\n  background: #00b7e6;\n}\n.tools .save-button {\n  display: inline-block;\n  float: right;\n  height: 42px;\n  outline: none;\n  background: #20e65c;\n  color: #fff;\n  font-size: 14px;\n  padding: 0 20px;\n  line-height: 42px;\n  border: none;\n  border-radius: 5px;\n}\n.tools .save-button:disabled {\n  opacity: 0.5;\n}\n#palette-wrapper {\n  position: absolute;\n  z-index: 10;\n  top: 40px;\n  left: -1px;\n  width: 400px;\n  height: 300px;\n  background: #fff;\n  border: 1px solid #fff;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.75);\n}\n#palette-wrapper.hidden {\n  display: none;\n}\n#color {\n  border-right: 0;\n}\n.color-wrapper:hover #palette-wrapper {\n  display: block;\n}\n.show-overflow {\n  overflow: visible !important;\n}\n.pagination {\n  display: block;\n  width: 100%;\n  float: none;\n  clear: both;\n  text-align: center;\n  margin: 10px 0;\n}\n.pagination .button {\n  font-size: 18px;\n  font-weight: 600;\n}\n.pagination .button.previous:before {\n  content: \"\\00AB\";\n}\n.pagination .button.next:after {\n  content: \" \\00BB\";\n}\n.pagination .button:nth-child(2) {\n  margin-left: 10px;\n}\n.grid-wrapper {\n  display: block;\n  margin: 20px auto;\n  padding: 10px;\n  border-radius: 2px;\n}\n#grid {\n  display: block;\n  margin: 0 auto;\n}\n"; });
define('text!designer.html', ['module'], function(module) { module.exports = "<template>\n  <div id=\"editor\">\n    <div class=\"tools\">\n        <div class=\"button-group\">\n          <button class=\"${align == 'normal' ? 'active' : ''}\" click.delegate=\"setAlign('normal')\" id=\"align-normal\">\n            <img src=\"/images/align-normal.png\" width=\"30\" height=\"30\">\n          </button>\n          <button class=\"${align == 'horizontal' ? 'active' : ''}\" click.delegate=\"setAlign('horizontal')\" id=\"align-horizontal\">\n            <img src=\"/images/align-horizontal.png\" width=\"30\" height=\"30\">\n          </button>\n          <button class=\"${align == 'vertical' ? 'active' : ''}\" click.delegate=\"setAlign('vertical')\" id=\"align-vertical\">\n            <img src=\"/images/align-vertical.png\" width=\"30\" height=\"30\">\n          </button>\n        </div>\n\n        <div class=\"button-group\">\n          <button class=\"${mode == 'brush' ? 'active' : ''}\" click.delegate=\"setMode('brush')\" id=\"mode-brush\">\n            <img src=\"/images/brush.png\" width=\"30\" height=\"30\">\n          </button>\n          <button class=\"${mode == 'fill' ? 'active' : ''}\" click.delegate=\"setMode('fill')\" id=\"mode-fill\">\n            <img src=\"/images/fill.png\" width=\"30\" height=\"30\">\n          </button>\n        </div>\n\n        <div class=\"button-group show-overflow color-wrapper\">\n          <button id=\"color\">\n            <img src=\"/images/picker.png\" width=\"30\" height=\"30\">\n          </button>\n\n          <div id=\"palette-wrapper\">\n            <canvas click.trigger=\"selectColor($event)\" id=\"palette\" width.bind=\"paletteWidth\" height.bind=\"paletteHeight\"></canvas>\n          </div>\n        </div>\n\n        <div class=\"right\">\n          <div class=\"select\">\n            <select value.bind=\"width\" change.trigger=\"changePatternSize()\">\n              <option value=\"10\">10</option>\n              <option value=\"11\">11</option>\n              <option value=\"12\">12</option>\n              <option value=\"13\">13</option>\n              <option value=\"14\">14</option>\n              <option value=\"15\">15</option>\n              <option value=\"16\">16</option>\n              <option value=\"17\">17</option>\n              <option value=\"18\">18</option>\n              <option value=\"19\">19</option>\n              <option value=\"20\">20</option>\n              <option value=\"21\">21</option>\n              <option value=\"22\">22</option>\n              <option value=\"23\">23</option>\n              <option value=\"24\">24</option>\n              <option value=\"25\">25</option>\n              <option value=\"26\">26</option>\n              <option value=\"27\">27</option>\n              <option value=\"28\">28</option>\n              <option value=\"29\">29</option>\n              <option value=\"30\">30</option>\n              <option value=\"31\">31</option>\n              <option value=\"32\">32</option>\n              <option value=\"33\">33</option>\n              <option value=\"34\">34</option>\n              <option value=\"35\">35</option>\n              <option value=\"36\">36</option>\n              <option value=\"37\">37</option>\n              <option value=\"38\">38</option>\n              <option value=\"39\">39</option>\n              <option value=\"40\">40</option>\n            </select>\n          </div>\n\n          <div class=\"label\">x</div>\n\n          <div class=\"select\">\n            <select value.bind=\"height\" change.trigger=\"changePatternSize()\">\n              <option value=\"10\">10</option>\n              <option value=\"11\">11</option>\n              <option value=\"12\">12</option>\n              <option value=\"13\">13</option>\n              <option value=\"14\">14</option>\n              <option value=\"15\">15</option>\n              <option value=\"16\">16</option>\n              <option value=\"17\">17</option>\n              <option value=\"18\">18</option>\n              <option value=\"19\">19</option>\n              <option value=\"20\">20</option>\n              <option value=\"21\">21</option>\n              <option value=\"22\">22</option>\n              <option value=\"23\">23</option>\n              <option value=\"24\">24</option>\n              <option value=\"25\">25</option>\n              <option value=\"26\">26</option>\n              <option value=\"27\">27</option>\n              <option value=\"28\">28</option>\n              <option value=\"29\">29</option>\n              <option value=\"30\">30</option>\n              <option value=\"31\">31</option>\n              <option value=\"32\">32</option>\n              <option value=\"33\">33</option>\n              <option value=\"34\">34</option>\n              <option value=\"35\">35</option>\n              <option value=\"36\">36</option>\n              <option value=\"37\">37</option>\n              <option value=\"38\">38</option>\n              <option value=\"39\">39</option>\n              <option value=\"40\">40</option>\n            </select>\n          </div>\n\n          <input value.bind=\"name\" type=\"text\" placeholder=\"Pattern Name\">\n          <button click.trigger=\"save()\" disabled.bind=\"saving\" class=\"save-button\">\n            <span if.bind=\"!saving\">Save</span>\n            <span if.bind=\"saving\">Saving...</span>\n          </button>\n        </div>\n    </div>\n\n    <div class=\"grid-wrapper\">\n      <canvas mousemove.delegate=\"drag($event)\" mouseup.trigger=\"click($event)\" mousedown.trigger=\"startDrawing($event)\" mouseleave.trigger=\"stopDrawing($event)\" id=\"grid\" width.bind=\"canvasWidth\" height.bind=\"canvasHeight\"></canvas>\n    </div>\n  </div>\n</template>\n"; });
define('text!pattern.html', ['module'], function(module) { module.exports = "<template>\n  <div if.bind=\"!errorMessage\">\n    <img src=\"${pattern.imageUrl}\">\n    <div>${pattern.name}</div>\n    <div>${pattern.description}</div>\n    <div>by ${pattern.user.displayName}</div>\n  </div>\n\n  <h1 if.bind=\"errorMessage\">${errorMessage}</h1>\n</template>\n"; });
define('text!patterns.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"pattern-tiles-container\">\n    <div repeat.for=\"pattern of patterns\">\n      <a route-href=\"route: pattern; params.bind: {id: pattern._id}\" class=\"pattern-tile\">\n        <img src=\"${pattern.imageUrl.replace('/upload', '/upload/c_thumb,w_150,h_150')}\" />\n        <div class=\"pattern-tile-name\">${pattern.name}</div>\n        <div class=\"pattern-tile-user\">by ${pattern.user.displayName}</div>\n      </a>\n    </div>\n  </div>\n\n  <div class=\"pagination\">\n    <a if.bind=\"showPrevious\" class=\"button previous\" route-href=\"route: patterns; params.bind: {page: page - 1}\">Previous Page</a>\n    <a if.bind=\"showNext\" class=\"button next\" route-href=\"route: patterns; params.bind: {page: page + 1}\">Next Page</a>\n  </div>\n</template>\n"; });
define('text!patternsByUser.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"pattern-tiles-container\">\n    <div repeat.for=\"pattern of patterns\">\n      <a route-href=\"route: pattern; params.bind: {id: pattern._id}\" class=\"pattern-tile\">\n        <img src=\"${pattern.imageUrl.replace('/upload', '/upload/c_thumb,w_150,h_150')}\" />\n        <div class=\"pattern-tile-name\">${pattern.name}</div>\n        <div class=\"pattern-tile-user\">by ${pattern.user.displayName}</div>\n      </a>\n    </div>\n  </div>\n\n  <div class=\"pagination\">\n    <a if.bind=\"showPrevious\" class=\"button previous\" route-href=\"route: patterns; params.bind: {page: page - 1}\">Previous Page</a>\n    <a if.bind=\"showNext\" class=\"button next\" route-href=\"route: patterns; params.bind: {page: page + 1}\">Next Page</a>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map