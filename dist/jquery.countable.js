/*! countable - v0.1.0 - 2015-07-22
* Copyright (c) 2015 light-li; Licensed MIT */
(function($) {
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

  // MIT license
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) { //jshint ignore:line
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
          },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }());

  function Counter(element, options) {
    this.$element = $(element);
    this.options = options;

    this.frameVal = this.from = this.options.from * 1;
    this.to = this.options.to * 1;
    this.duration = this.options.duration;
    this.decimals = Math.max(0, this.options.decimals);
    this.desc = Math.pow(10, this.options.decimals);
    this.startTime = null;

    var dtd = $.Deferred();
    this.$promise = dtd.promise();

    var self = this;
    this.count = function(timestamp) {
      var from = self.from,
        to = self.to,
        duration = self.duration,
        countDown = from > to;
      if (self.startTime === null) {
        self.startTime = timestamp;
      }
      var progress = timestamp - self.startTime;

      if (countDown) {
        var i = self.easeOutExpo(progress, 0, from - to, duration);
        self.frameVal = i;
      } else {
        self.frameVal = self.easeOutExpo(progress, from, to - from, duration);
      }

      self.frameVal = Math.round(self.frameVal * self.desc) / self.desc;

      if (countDown) {
        self.frameVal = (self.frameVal < to) ? to : self.frameVal;
      } else {
        self.frameVal = (self.frameVal > to) ? to : self.frameVal;
      }

      //format and print value
      var val = self.frameVal.toFixed(self.decimals);
      if (self.options.commas) {
        val = self.addCommas(val);
      }
      self.$element.html(val);

      if (progress < duration) {
        requestAnimationFrame(self.count);
      } else {
        dtd.resolve();
      }
    };
  }
  //default options
  Counter.DEFAULTS = {
    commas: false,
    decimals: 0, //number of decimal places in number, default 0
    duration: 1000 //duration in ms
  };

  Counter.prototype.start = function() {
    if (!isNaN(this.to) && !isNaN(this.from)) {
      requestAnimationFrame(this.count);
    } else {
      this.$element.html('--');
      throw new Error('from or to is not a number');
    }
    return false;
  };

  Counter.prototype.easeOutExpo = function(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
  };

  Counter.prototype.reset = function() {
    this.$element.html(0);
  };

  Counter.prototype.addCommas = function(nStr) {
    var x, x1, x2, rgx;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;

  };

  $.Counter = Counter;

  $.fn.countable = function(option) {

    return $(this).each(function() {
      var $this = $(this);
      var data = $this.data('counter');
      var options = $.extend({}, Counter.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {
        data = new Counter(this, options);
        $this.data('counter', data);
      }
      if (typeof option === 'string') {
        data[option]();
      } else if (options.show) {
        data.show();
      }
    });
  };
}(jQuery));
