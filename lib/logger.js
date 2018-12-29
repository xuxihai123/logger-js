(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Logger = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Logger =
  /*#__PURE__*/
  function () {
    function Logger() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Logger);

      this._name = options.name || '';
      this._level = options.level || 0; //%t %n  %l

      this._format = options.format || '[%t] %l:'; //%t %n  %l
    }

    _createClass(Logger, [{
      key: "log",
      value: function log() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        this._logger.apply(this, ['log'].concat(args));
      }
    }, {
      key: "info",
      value: function info() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        this._logger.apply(this, ['info'].concat(args));
      }
    }, {
      key: "debug",
      value: function debug() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        this._logger.apply(this, ['debug'].concat(args));
      }
    }, {
      key: "warn",
      value: function warn() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        this._logger.apply(this, ['warn'].concat(args));
      }
    }, {
      key: "error",
      value: function error() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        this._logger.apply(this, ['error'].concat(args));
      }
    }, {
      key: "_logger",
      value: function _logger(type) {
        if (['log', 'info', 'debug', 'warn', 'error'].indexOf(type) >= this._level) {
          var timestrap = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
          var prefix;
          var level = type.toUpperCase();
          var options = {
            name: this._name,
            timestrap: timestrap,
            level: level
          };

          if (typeof this._format === 'function') {
            prefix = this._format(options);
          } else {
            prefix = this._formatMsg(options, this._format);
          }

          for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            args[_key6 - 1] = arguments[_key6];
          }

          try {
            console[type].apply(console, [prefix].concat(args));
          } catch (e) {
            console.log.apply(console, [prefix].concat(args));
          }
        }
      }
    }, {
      key: "_formatMsg",
      value: function _formatMsg(options, format) {
        return format.replace(/%t/, options.timestrap).replace(/%l/, options.level).replace(/%n/, options.name);
      }
    }, {
      key: "setFormat",
      value: function setFormat(_format) {
        this._format = _format;
        return this;
      }
    }, {
      key: "setScope",
      value: function setScope(name) {
        this._name = name;
        return this;
      }
    }, {
      key: "setLevel",
      value: function setLevel(level) {
        this._level = level;
        return this;
      }
    }, {
      key: "set",
      value: function set(key, value) {
        if (['name', 'level', 'format'].indexOf(key) !== -1) {
          this['_' + key] = value;
          return this;
        } else {
          throw Error('key ' + key + ' is not exist');
        }
      }
    }]);

    return Logger;
  }();

  var globalLogger = new Logger();

  globalLogger.scope = function (name) {
    return new Logger({
      name: name
    });
  };

  globalLogger.Logger = Logger;

  return globalLogger;

})));
