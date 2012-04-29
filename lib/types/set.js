/**
 *  class Set
 *
 *  Provides Array that contains only unique elements.
 *
 *  ##### Example
 *
 *      var set = new Set();
 *
 *      set.push('Hello').push('World!').push('Hello');
 *      set.join(' ');
 *      // -> Hello World!
 **/


'use strict';


var Set = module.exports = function Set(arr) {
  Object.defineProperty(this, '__arr__', {value: []});

  if (arr) {
    arr.forEach(function (el) { this.push(el); }, this);
  }
};


Set.prototype.unshift = function (val) {
  if (-1 === this.__arr__.indexOf(val)) {
    this.__arr__.unshift(val);
  }
};


Set.prototype.push = function (val) {
  if (-1 === this.__arr__.indexOf(val)) {
    this.__arr__.push(val);
  }
};


['forEach', 'slice', 'join', 'shift', 'pop'].forEach(function (name) {
  Set.prototype[name] = function () {
    return this.__arr__[name].apply(this.__arr__, arguments);
  };
});


Object.defineProperty(Set.prototype, 'length', {
  get: function () { return this.__arr__.length; }
});


Set.prototype.toArray = function () {
  return this.slice();
};
