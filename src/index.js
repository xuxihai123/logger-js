class Logger{
  constructor(options={}){
    this._name = options.name || '';
    this._level = options.level || 0;  //%t %n  %l
    this._format = options.format || '[%t] %l:';  //%t %n  %l
  }
  log(...args){
    this._logger('log', ...args);
  }
  info(...args){
    this._logger('info', ...args);
  }
  debug(...args){
    this._logger('debug', ...args);
  }
  warn(...args){
    this._logger('warn', ...args);
  }
  error(...args){
    this._logger('error', ...args);
  }
  _logger(type,...args){
    if (['log', 'info', 'debug', 'warn', 'error'].indexOf(type) >= this._level) {
      let timestrap = new Date().toTimeString().
        replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      let prefix;
      let level = type.toUpperCase();
      let options = { name: this._name, timestrap, level };
      if (typeof this._format === 'function') {
        prefix = this._format(options);
      } else {
        prefix = this._formatMsg(options, this._format);
      }
      try {
        console[type].apply(console, [prefix, ...args]);
      } catch (e) {
        console.log.apply(console, [prefix, ...args]);
      }
    }
  }
  _formatMsg(options,format){
    return format.replace(/%t/, options.timestrap).
      replace(/%l/, options.level).
      replace(/%n/, options.name);
  }
  setFormat(_format){
    this._format = _format;
    return this;
  }
  setScope(name){
    this._name = name;
    return this;
  }
  setLevel(level){
    this._level = level;
    return this;
  }
  set(key,value){
    if(['name','level','format'].indexOf(key)!==-1){
      this['_' + key] = value;
      return this;
    }else{
      throw Error('key '+key+' is not exist');
    }
  }
}

let globalLogger = new Logger();
globalLogger.scope = function(name) {
  return new Logger({name});
};
globalLogger.Logger =Logger;

export default globalLogger;
