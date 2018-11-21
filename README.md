logger5js
---

[![Build Status](https://travis-ci.org/xuxihai123/logger5js.svg?branch=master)](https://travis-ci.org/xuxihai123/logger5js)

a simple logger in javascript with five level.

**Features:**  

🔥 support five log level.  
🚀 custom format string or function.  
🎉 set prefix label.

## Installation

```bash
npm install logger5js --save-dev
```

## Usage

1.global instance

```js
let globalLogger = require('logger5js');

globalLogger.log(123);
globalLogger.setScope('labelA').setFormat('->%l').setLevel(3);

```

2.a new instance

```js
let Logger = require('logger5js').Logger;

let logger = new Logger({name:'LabelA',level:3,format:'%l:'});

logger.setScope('labelA').setFormat('->%l').setLevel(3);
```

3. Shortcut to create a new instance
```js
let otherLogger  = require('logger5js').scope('LabelB');
```
