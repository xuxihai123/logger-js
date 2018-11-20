function Logger(options) {
  options = options || {};
  this._name = options.name || '';
  this._level = options.level || 0;  //%t %n  %l
  this._format = options.format || '[%t] %l:';  //%t %n  %l
}

Logger.prototype._logger = function(level, ...args) {
  if (['log', 'info', 'debug', 'warn', 'error'].indexOf(level) >= this._level) {
    let timestrap = new Date().toTimeString().
        replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    let prefix;
    level = level.toUpperCase();
    let options = { name: this._name, timestrap, level };
    if (typeof this._format === 'function') {
      prefix = this._format(options);
    } else {
      prefix = this._formatMsg(options, this._format);
    }
    try {
      console[level].apply(console, [prefix, ...args]);
    } catch (e) {
      console.log.apply(console, [prefix, ...args]);
    }
  }
};

Logger.prototype._formatMsg = function(options, format) {
  return format.replace(/%t/, options.timestrap).
      replace(/%l/, options.level).
      replace(/%n/, options.name);
};

Logger.prototype.log = function(msg = '', ...args) { //0
  this._logger.apply(this, ['log', msg, ...args]);
};

Logger.prototype.info = function(...args) {  //1
  this._logger.apply(this, ['info', ...args]);
};

Logger.prototype.debug = function(...args) { //2
  this._logger.apply(this, ['debug', ...args]);
};

Logger.prototype.warn = function(...args) { //3
  this._logger.apply(this, ['warn', ...args]);
};

Logger.prototype.error = function(...args) { //4
  this._logger.apply(this, ['error', ...args]);
};

Logger.prototype.setFormat = function(_format) { //set format
  this._format = _format;
  return this;
};

Logger.prototype.setScope = function(name) { //set scope

  this._name = name;
  return this;
};

Logger.prototype.setLevel = function(level) { //set level
  this._level = level;
  return this;
};
Logger.prototype.set=function(key,value) {
  if(['name','level','format'].indexOf(key)!==-1){
    this['_' + key] = value;
    return this;
  }else{
    throw Error('key '+key+' is not exist');
  }
};

let globalLogger = new Logger();
globalLogger.scope = function(name) {
  return new Logger({name});
};
globalLogger.Logger =Logger;

export default globalLogger;
