/**
 * # Concise.js
 * http://github.com/ConciseCSS/concise.css
 *
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
(function($){
  /**
   * Powers the universal dropdown selector.
   *
   * @class DropDown
   * @param {Object} el jQuery object
   */
  function DropDown(el) {
    this.dd = el;
    this.initEvents();
  }

  DropDown.prototype = {
    initEvents : function() {
      // Toggle .dropdown-active on click
      this.dd.on('click', function(event){
        $(this).toggleClass('dropdown-active');
        event.stopPropagation();
      });

      // Toggle .dropdown-active on hover
      $(".dropdown-hover").mouseenter(function(event) {
        $(this).addClass("dropdown-active");
        event.stopPropagation();
      });
    }
  }


  /**
   * Determine if responsive navigation text needs to be added.
   *
   * @method responsiveNav
   * @return {Object} naver A naver plugin instantiation
   */
  $.fn.responsiveNav = function() {
    // Loop through each instance of responsive navigation
    this.each(function(index) {
      var labelState = $(this).hasClass( "nav-responsive-text" );

      return $(this).naver({
        maxWidth: "768px",
        label: labelState
      });
    });
  };


  /**
   * Calculate object width
   */
  $.fn.calculateWidth = function() {
    return $(this).width();
  };


  /**
   * Calculates proper widths for non-responsive websites.
   *
   * @method nonResponsive
   * @note Only necessary for non-responsive websites.
   */
  $.fn.nonResponsive = function() {

    // Loop through each instance of the `.non-responsive` class
    this.each(function(index) {
      if ($(this).hasClass("non-responsive")) {

        // Get container width
        var containerWidth = $(".container").width(),
          i = 1,
          max = 24;

        // Set pixel-based alternatives for grid styles
        // But first we need to know if our row has class `gutters`
        if($(this).hasClass("gutters")) {
          for (; i <= max; i++ ) {
            // Column width for row with gutters
            var columnWidth = ($('.column-'+i).calculateWidth()),
              gutterWidth = columnWidth * 0.02;

            $('.gutters .column-'+i).css("width", columnWidth - gutterWidth + "px");
          }
        } else {
          for (; i <= max ; i++ ) {
            // Column width for normal row
            var columnWidth = ($('.column-'+i).calculateWidth() - 1);
            $('.column-'+i).css("width", columnWidth + "px");
          }
        }
      }
    });
  };

  $(function(){
    var dropdown = $('.dropdown');

    new DropDown(dropdown);

    $(document).click(function() {
      dropdown.removeClass('dropdown-active');
    });

    $(".dropdown-menu").mouseleave(function() {
      dropdown.removeClass("dropdown-active");
    });
  });
}(jQuery));

jQuery(document).ready(function() {
  jQuery(".nav-responsive, .nav-responsive-left, .nav-responsive-center").responsiveNav();
  jQuery("body, .row").nonResponsive();
});


/*
 * Naver v3.0.8 - 2014-05-06
 * A jQuery plugin for responsive navigation. Part of the Formstone Library.
 * http://formstone.it/naver/
 *
 * Copyright 2014 Ben Plum; MIT Licensed
 */

;(function ($, window) {
  "use strict";

  /**
   * @options
   * @param customClass [string] <''> "Class applied to instance"
   * @param label [boolean] <true> "Display handle width label"
   * @param labels.closed [string] <'Navigation'> "Closed state text"
   * @param labels.open [string] <'Close'> "Open state text"
   * @param maxWidth [string] <'980px'> "Width at which to auto-disable plugin"
   */
  var options = {
    customClass: "",
    label: true,
    labels: {
      closed: "Navigation",
      open: "Close"
    },
    maxWidth: "980px"
  };

  /**
   * @events
   * @event open.naver "Navigation opened"
   * @event close.naver "Navigation closed"
   */

  var pub = {

    /**
     * @method
     * @name close
     * @description Closes instance
     * @example $(".target").naver("close");
     */
    close: function(e) {
      return $(this).each(function(i, nav) {
        var data = $(nav).data("naver");

        if (data && data.$nav.hasClass("enabled")) {
          data.$wrapper.css({
            height: 0
          });
          if (data.label) {
            data.$handle.html(data.labels.closed);
          }
          data.$nav.removeClass("open")
               .trigger("close.naver");
        }
      });
    },

    /**
     * @method
     * @name defaults
     * @description Sets default plugin options
     * @param opts [object] <{}> "Options object"
     * @example $.naver("defaults", opts);
     */
    defaults: function(opts) {
      options = $.extend(true, options, opts || {});
      return $(this);
    },

    /**
     * @method
     * @name disable
     * @description Disables instance
     * @example $(".target").naver("disable");
     */
    disable: function() {
      return $(this).each(function(i, nav) {
        var data = $(nav).data("naver");

        if (data) {
          data.$nav.removeClass("enabled");
          data.$wrapper.css({ height: "" });
        }
      });
    },

    /**
     * @method
     * @name destroy
     * @description Destroys instance
     * @example $(".target").naver("destroy");
     */
    destroy: function() {
      return $(this).each(function(i, nav) {
        var data = $(nav).data("naver");

        if (data) {
          data.$handle.remove();
          data.$container.contents()
                   .unwrap()
                   .unwrap();

          data.$nav.removeClass("enabled disabled naver " + data.customClass)
               .off(".naver")
               .removeData("naver");
        }
      });
    },

    /**
     * @method
     * @name enable
     * @description Enables instance
     * @example $(".target").naver("enable");
     */
    enable: function() {
      return $(this).each(function(i, nav) {
        var data = $(nav).data("naver");

        if (data) {
          data.$nav.addClass("enabled");
          pub.close.apply(data.$nav);
        }
      });
    },

    /**
     * @method
     * @name open
     * @description Opens instance
     * @example $(".target").naver("open");
     */
    open: function() {
      return $(this).each(function(i, nav) {
        var data = $(nav).data("naver");

        if (data && data.$nav.hasClass("enabled")) {
          data.$wrapper.css({
            height: data.$container.outerHeight(true)
          });
          if (data.label) {
            data.$handle.html(data.labels.open);
          }
          data.$nav.addClass("open")
               .trigger("open.naver");
        }
      });
    }
  };

  /**
   * @method private
   * @name _init
   * @description Initializes plugin
   * @param opts [object] "Initialization options"
   */
  function _init(opts) {
    // Settings
    opts = $.extend(true, {}, options, opts);

    // Apply to each element
    var $items = $(this);
    for (var i = 0, count = $items.length; i < count; i++) {
      _build($items.eq(i), opts);
    }
    return $items;
  }

  /**
   * @method private
   * @name _build
   * @description Builds each instance
   * @param $nav [jQuery object] "Target jQuery object"
   * @param opts [object] <{}> "Options object"
   */
  function _build($nav, opts) {
    if (!$nav.data("naver")) {
      // Extend Options
      opts = $.extend(true, {}, opts, $nav.data("naver-options"));

      var $handle = $nav.find(".naver-handle").length ? $nav.find(".naver-handle").detach() : $('<span class="naver-handle"></span>');

      $nav.addClass("naver " + opts.customClass)
        .wrapInner('<div class="naver-container"></div>')
        .wrapInner('<div class="naver-wrapper"></div>')
        .prepend($handle);

      var data = $.extend(true, {
        $nav: $nav,
        $container: $nav.find(".naver-container"),
        $wrapper: $nav.find(".naver-wrapper"),
        $handle: $nav.find(".naver-handle")
      }, opts);

      data.$handle.text((opts.label) ? opts.labels.closed : '');
      data.$nav.on("touchstart.naver", ".naver-handle", data, _onTouchStart)
           .on("click.naver", ".naver-handle", data, _onClick)
           .data("naver", data);


      // Navtive MQ Support
      if (window.matchMedia !== undefined) {
        data.mediaQuery = window.matchMedia("(max-width:" + (data.maxWidth === Infinity ? "100000px" : data.maxWidth) + ")");
        // Make sure we stay in context
        data.mediaQuery.addListener(function() {
          _onRespond.apply(data.$nav);
        });
        _onRespond.apply(data.$nav);
      }
    }
  }

  /**
   * @method private
   * @name _onTouchStart
   * @description Handles touchstart to selected item
   * @param e [object] "Event data"
   */
  function _onTouchStart(e) {
    e.stopPropagation();

    var data = e.data,
      oe = e.originalEvent;

    _clearTimer(data.timer);

    data.touchStartX = oe.touches[0].clientX;
    data.touchStartY = oe.touches[0].clientY;

    data.$nav.on("touchmove.naver", ".naver-handle", data, _onTouchMove)
         .on("touchend.naver", ".naver-handle", data, _onTouchEnd);
  }

  /**
   * @method private
   * @name _onTouchMove
   * @description Handles touchmove to selected item
   * @param e [object] "Event data"
   */
  function _onTouchMove(e) {
    var data = e.data,
      oe = e.originalEvent;

    if (Math.abs(oe.touches[0].clientX - data.touchStartX) > 10 || Math.abs(oe.touches[0].clientY - data.touchStartY) > 10) {
      data.$nav.off("touchmove.naver touchend.naver");
    }
  }

  /**
   * @method private
   * @name _onTouchEnd
   * @description Handles touchend to selected item
   * @param e [object] "Event data"
   */
  function _onTouchEnd(e) {
    e.preventDefault();
    e.stopPropagation();

    var data = e.data;

    data.$nav.off("touchmove.naver touchend.naver click.naver");

    // prevent ghosty clicks
    data.timer = _startTimer(data.timer, 1000, function() {
      data.$nav.on("click.naver", ".naver-handle", data, _onClick);
    });

    _onClick(e);
  }

  /**
   * @method private
   * @name _onClick
   * @description Handles click nav click
   * @param e [object] "Event data"
   */
  function _onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    var $target = $(e.currentTarget),
      data = e.data;

    // Close other open instances
    $(".naver").not(data.$nav)
           .naver("close");

    if (data.$nav.hasClass("open")) {
      pub.close.apply(data.$nav);
    } else {
      pub.open.apply(data.$nav);
    }
  }

  /**
   * @method private
   * @name _onRespond
   * @description Handles media query match change
   */
  function _onRespond() {
    var data = $(this).data("naver");

    if (data.mediaQuery.matches) {
      pub.enable.apply(data.$nav);
    } else {
      pub.disable.apply(data.$nav);
    }
  }

  /**
   * @method private
   * @name _startTimer
   * @description Starts an internal timer
   * @param timer [int] "Timer ID"
   * @param time [int] "Time until execution"
   * @param callback [int] "Function to execute"
   * @param interval [boolean] "Flag for recurring interval"
   */
  function _startTimer(timer, time, func, interval) {
    _clearTimer(timer, interval);
    if (interval === true) {
      return setInterval(func, time);
    } else {
      return setTimeout(func, time);
    }
  }

  /**
   * @method private
   * @name _clearTimer
   * @description Clears an internal timer
   * @param timer [int] "Timer ID"
   */
  function _clearTimer(timer) {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  $.fn.naver = function(method) {
    if (pub[method]) {
      return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return _init.apply(this, arguments);
    }
    return this;
  };

  $.naver = function(method) {
    if (method === "defaults") {
      pub.defaults.apply(this, Array.prototype.slice.call(arguments, 1));
    }
  };
})(jQuery, window);
