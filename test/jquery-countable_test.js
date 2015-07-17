(function ($) {
  module('jQuery#jqueryCountable', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.jqueryCountable(), this.elems, 'should be chainable');
  });

  test('is jqueryCountable', function () {
    expect(1);
    strictEqual(this.elems.jqueryCountable().text(), 'jqueryCountable0jqueryCountable1jqueryCountable2', 'should be jqueryCountable');
  });

}(jQuery));
