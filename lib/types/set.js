/**
 *  class Set
 *
 *  Provides array-like structure that contains ONLY unique elements.
 **/


'use strict';


var Set = module.exports = function Set(arr) {
  this.__set_data__ = [];

  if (arr) {
    arr.forEach(function (el) {
      this.add(el);
    }, this);
  }
};


Set.prototype.add = function add(el) {
  if (!this.has(el)) {
    this.__set_data__.push(el);
  }
};


Set.prototype.remove = function remove(el) {
  var i, val;
  
  i = this.__set_data__.indexOf(el);
  val = this.__set_data__[i];

  delete this.__set_data__[i];
  return val;
};


Set.prototype.has = function contains(el) {
  return 0 <= this.__set_data__.indexOf(el);
};


Set.prototype.toArray = function toArray() {
  return this.__set_data__.slice();
};
