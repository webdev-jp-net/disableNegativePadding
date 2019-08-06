/**
 * Disable Negative Padding for Internet Explorer 11
 *
 * @constructor
 * @this { disableNegativePadding }
 * @param { Node } target
 * @see {@link https://codepen.io/webdev-jp-net/pen/ymbzxq}
 */
var disableNegativePadding = function($target) {
  var isIE = window.navigator.userAgent.toLowerCase().indexOf("trident");
  if (isIE === -1) return;

  if (!$target) return;
  this.$target = $target;

  var breakpoint = window.getComputedStyle($target, null).getPropertyValue('max-width');
  if (!breakpoint) return;
  this.breakpoint = breakpoint;

  this.isBreak = null;

  var padding = {
    left: $target.currentStyle.getPropertyValue('padding-left'),
    right: $target.currentStyle.getPropertyValue('padding-right')
  };
  this.pointer = [];
  for (var o in padding) {
    if (padding[o].match(/calc/g)) this.pointer.push('padding-' + o);
  }

  this.init();
};

// destory
disableNegativePadding.prototype.destory = function() {
  window.removeEventListener('resize', this.getBreakpoint);
};

// initialize
disableNegativePadding.prototype.init = function() {
  this.destory();
  window.addEventListener('resize', this.getBreakpoint.bind(this), false);
  this.getBreakpoint.call(this);
};

// actBreakpoint
disableNegativePadding.prototype.actBreakpoint = function(isBreak) {
  this.pointer.forEach(function(name) {
    this.$target.style[isBreak ? 'setProperty' : 'removeProperty'](name, 0);
  }, this);
};

// actBreakpoint
disableNegativePadding.prototype.getBreakpoint = function() {
  var isBreak = window.matchMedia('(max-width:' + this.breakpoint + ')').matches !== this.isBreak;
  if (isBreak) {
    this.isBreak = isBreak;
    this.actBreakpoint.call(this, this.isBreak);
  }
};
