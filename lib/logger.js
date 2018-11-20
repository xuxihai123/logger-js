(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Logger = factory());
}(this, (function () { 'use strict';

  function Logger(options) {
    options = options || {};
    this._name = options.name || '';
    this._level = options.level || 0; //%t %n  %l

    this._format = options.format || '[%t] %l:'; //%t %n  %l
  }

  Logger.prototype._logger = function (level) {
    if (['log', 'info', 'debug', 'warn', 'error'].indexOf(level) >= this._level) {
      var timestrap = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      var prefix;
      level = level.toUpperCase();
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

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      try {
        console[level].apply(console, [prefix].concat(args));
      } catch (e) {
        console.log.apply(console, [prefix].concat(args));
      }
    }
  };

  Logger.prototype._formatMsg = function (options, format) {
    return format.replace(/%t/, options.timestrap).replace(/%l/, options.level).replace(/%n/, options.name);
  };

  Logger.prototype.log = function () {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    //0
    this._logger.apply(this, ['log', msg].concat(args));
  };

  Logger.prototype.info = function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    //1
    this._logger.apply(this, ['info'].concat(args));
  };

  Logger.prototype.debug = function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    //2
    this._logger.apply(this, ['debug'].concat(args));
  };

  Logger.prototype.warn = function () {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    //3
    this._logger.apply(this, ['warn'].concat(args));
  };

  Logger.prototype.error = function () {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    //4
    this._logger.apply(this, ['error'].concat(args));
  };

  Logger.prototype.setFormat = function (_format) {
    //set format
    this._format = _format;
    return this;
  };

  Logger.prototype.setScope = function (name) {
    //set scope
    this._name = name;
    return this;
  };

  Logger.prototype.setLevel = function (level) {
    //set level
    this._level = level;
    return this;
  };

  Logger.prototype.set = function (key, value) {
    if (['name', 'level', 'format'].indexOf(key) !== -1) {
      this['_' + key] = value;
      return this;
    } else {
      throw Error('key ' + key + ' is not exist');
    }
  };

  var globalLogger = new Logger();

  globalLogger.scope = function (name) {
    return new Logger({
      name: name
    });
  };

  globalLogger.Logger = Logger;

  return globalLogger;

})));
