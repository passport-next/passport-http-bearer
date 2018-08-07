# passport-http-bearer

[![NPM version](https://img.shields.io/npm/v/@passport-next/passport-http-bearer.svg)](https://www.npmjs.com/package/@passport-next/passport-http-bearer)
[![Build Status](https://travis-ci.org/passport-next/passport-http-bearer.svg?branch=master)](https://travis-ci.org/passport-next/passport-http-bearer)
[![Coverage Status](https://coveralls.io/repos/github/passport-next/passport-http-bearer/badge.svg?branch=master)](https://coveralls.io/github/passport-next/passport-http-bearer?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/b0e8ebd6d4441c50a951/maintainability)](https://codeclimate.com/github/passport-next/passport-http-bearer/maintainability)
[![Dependencies](https://david-dm.org/passport-next/passport-http-bearer.png)](https://david-dm.org/passport-next/passport-http-bearer)
<!--[![SAST](https://gitlab.com/passport-next/passport-http-bearer/badges/master/build.svg)](https://gitlab.com/passport-next/passport-http-bearer/badges/master/build.svg)-->

HTTP Bearer authentication strategy for [Passport](https://github.com/passport-next).

This module lets you authenticate HTTP requests using bearer tokens, as
specified by [RFC 6750](http://tools.ietf.org/html/rfc6750), in your Node.js
applications.  Bearer tokens are typically used protect API endpoints, and are
often issued using OAuth 2.0.

By plugging into Passport, bearer token support can be easily and unobtrusively
integrated into any application or framework that supports
[Connect](https://github.com/senchalabs/connect#readme)-style middleware, including
[Express](https://expressjs.com/).

## Install

    $ npm install @passport-next/passport-http-bearer

## Usage

#### Configure Strategy

The HTTP Bearer authentication strategy authenticates users using a bearer
token.  The strategy requires a `verify` callback, which accepts that
credential and calls `done` providing a user.  Optional `info` can be passed,
typically including associated scope, which will be set by Passport at
`req.authInfo` to be used by later middleware for authorization and access
control.

    passport.use(new BearerStrategy(
      function(token, done) {
        User.findOne({ token: token }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user, { scope: 'all' });
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'bearer'` strategy, to
authenticate requests.  Requests containing bearer tokens do not require session
support, so the `session` option can be set to `false`.

For example, as route middleware in an [Express](https://expressjs.com/)
application:

    app.get('/profile', 
      passport.authenticate('bearer', { session: false }),
      function(req, res) {
        res.json(req.user);
      });

#### Issuing Tokens

Bearer tokens are typically issued using OAuth 2.0.  [OAuth2orize](https://github.com/passport-next/oauth2orize)
is a toolkit for implementing OAuth 2.0 servers and issuing bearer tokens.  Once
issued, this module can be used to authenticate tokens as described above.

## Examples

For a complete, working example, refer to the [Bearer example](https://github.com/passport/express-4.x-http-bearer-example).

## Related Modules

- [OAuth2orize](https://github.com/jaredhanson/oauth2orize) — OAuth 2.0 authorization server toolkit

## Tests

    $ npm install
    $ npm test
