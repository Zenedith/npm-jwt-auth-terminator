# jwt-auth-terminator
[![npm version](https://badge.fury.io/js/jwt-auth-terminator.svg)](https://badge.fury.io/js/jwt-auth-terminator)
[![bitHound Score](https://www.bithound.io/github/Zenedith/npm-jwt-auth-terminator/badges/score.svg)](https://www.bithound.io/github/Zenedith/npm-jwt-auth-terminator)
[![Coverage Status](https://coveralls.io/repos/Zenedith/npm-jwt-auth-terminator/badge.svg?branch=master&service=github)](https://coveralls.io/github/Zenedith/npm-jwt-auth-terminator?branch=master)
[![Build Status](https://travis-ci.org/Zenedith/npm-jwt-auth-terminator.svg)](https://travis-ci.org/Zenedith/npm-jwt-auth-terminator)
[![Dependency Status](https://david-dm.org/Zenedith/npm-jwt-auth-terminator.svg)](https://david-dm.org/Zenedith/npm-jwt-auth-terminator)
[![devDependency Status](https://david-dm.org/Zenedith/npm-jwt-auth-terminator/dev-status.svg)](https://david-dm.org/Zenedith/npm-jwt-auth-terminator#info=devDependencies)

[![NPM](https://nodei.co/npm/jwt-auth-terminator.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jwt-auth-terminator/)

JWT auth terminator

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install jwt-auth-terminator --save
```


## Tests

```sh
npm install
npm test
```

## Dependencies

- [config](https://github.com/lorenwest/node-config): Configuration control for production node deployments
- [jwt-simple](https://github.com/hokaccha/node-jwt-simple): JWT(JSON Web Token) encode and decode module
- [request](https://github.com/request/request): Simplified HTTP request client.
- [winston](https://github.com/flatiron/winston): A multi-transport async logging library for Node.js
- [winston-loggly](https://github.com/indexzero/winston-loggly): A Loggly transport for winston

## Dev Dependencies

- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [istanbul](https://github.com/gotwarlost/istanbul): Yet another JS code coverage tool that computes statement, line, function and branch coverage with module loader hooks to transparently add coverage when running tests. Supports all JS coverage use cases including unit tests, server side functional tests
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [rewire](https://github.com/jhnns/rewire): Easy dependency injection for node.js unit testing


## License
The MIT License (MIT)

Copyright (c) 2015 Zenedith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.