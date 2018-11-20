var assert = require('assert');
let globalLogger = require('../lib/logger');

describe('test', function() {
  it('set scope', function() {
    globalLogger.setScope('aaa');
    assert.equal('aaa',globalLogger._name);
  });
  it('set format', function() {
    globalLogger.setFormat('[%n %t]');
    assert.equal('[%n %t]',globalLogger._format);
  });
  it('set format', function() {
    globalLogger.setLevel(3);
    assert.equal(3,globalLogger._level);
  });
  it('set key', function() {
    globalLogger.set('name','labelA');
    globalLogger.set('level',2);
    globalLogger.set('format','1233');
    assert.equal('labelA',globalLogger._name);
    assert.equal(2,globalLogger._level);
    assert.equal('1233',globalLogger._format);
  });
  it('global scope', function() {
    let logger = globalLogger.scope('bbb');
    assert(logger instanceof globalLogger.Logger);
    assert(logger !==globalLogger);
    assert(logger._name ==='bbb');
  });
});


