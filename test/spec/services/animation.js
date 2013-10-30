'use strict';

describe('Service: Animation', function () {

  // load the service's module
  beforeEach(module('portfolioApp'));

  // instantiate service
  var Animation;
  beforeEach(inject(function (_Animation_) {
    Animation = _Animation_;
  }));

  it('should do something', function () {
    expect(!!Animation).toBe(true);
  });

});
