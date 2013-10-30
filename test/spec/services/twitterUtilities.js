'use strict';

describe('Service: Twitterutilities', function () {

  // load the service's module
  beforeEach(module('PortfolioApp'));

  // instantiate service
  var Twitterutilities;
  beforeEach(inject(function (_Twitterutilities_) {
    Twitterutilities = _Twitterutilities_;
  }));

  it('should do something', function () {
    expect(!!Twitterutilities).toBe(true);
  });

});
