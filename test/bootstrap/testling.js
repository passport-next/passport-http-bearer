var chai = require('chai')
  , passport = require('@passport-next/chai-passport-strategy');

chai.use(passport);


window.expect = chai.expect;
