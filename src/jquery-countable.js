/*
 * 
 * 
 *
 * Copyright (c) 2015 light-li
 * Licensed under the MIT license.
 */
(function ($) {
  $.fn.jqueryCountable = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('jqueryCountable' + i);
    });
  };
}(jQuery));
