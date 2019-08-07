/**
 * Disable Negative Padding for Internet Explorer 11
 *
 * @constructor
 * @this { disableNegativePadding }
 * @param { Node } target
 * @see {@link https://github.com/webdev-jp-net/disableNegativePadding}
 * @see {@link https://codepen.io/webdev-jp-net/pen/ymbzxq}
 */
var disableNegativePadding = function($target) {
  if (window.navigator.userAgent.toLowerCase().indexOf("trident") === -1) return;
  if (!$target) return;
  this.$target = $target;
  this.pointer = [];
  this.init();
};

// destory
disableNegativePadding.prototype.destory = function() {
  this.pointer = [];
  window.removeEventListener('resize', this.getBreakpoint);
};

// initialize
disableNegativePadding.prototype.init = function() {
  this.destory();
  ['padding-top', 'padding-left', 'padding-right', 'padding-bottom'].forEach(function(name) {
    var value = this.$target.currentStyle.getPropertyValue(name);
    if (value.match(/calc/g)) this.pointer.push(name);
    else if(this.actMeasure(name) < 0) this.$target.style.setProperty(name, 0);
  }, this);
  window.addEventListener('resize', this.watchPadding.bind(this), false);
  this.watchPadding.call(this);
};

/**
 * Measure padding
 * @param { String } padding positions
 * @return { Number } padding value
 */
disableNegativePadding.prototype.actMeasure = function(position) {
  var value = window.getComputedStyle(this.$target, null).getPropertyValue(position);
  return +value.replace(/px/g, '');
};

// watchPadding
disableNegativePadding.prototype.watchPadding = function() {
  this.pointer.forEach(function(name) {
    this.$target.style.removeProperty(name);
    if(this.actMeasure(name) < 0) this.$target.style.setProperty(name, 0);
  }, this);
};
