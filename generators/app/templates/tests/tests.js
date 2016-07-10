/* eslint-disable no-unused-vars */
const chai = require('chai');
const mocha = require('mocha');
const request = require('supertest');
const routes = require('../routes/all');
const should = chai.should();
/* eslint-enable no-unused-vars */

describe('routes', () => {
  it('has all routes', () => {
    routes.should.have.property('index');
  });
});
