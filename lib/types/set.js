/**
 *  class Set
 *
 *  Provides array-like structure that contains ONLY unique elements.
 **/


'use strict';


function get_idx(self, key) {
  return self.__set_data__.indexOf(key);
}


var Set = module.exports = function Set(arr) {
  this.__set_data__ = [];

  if (arr) {
    arr.forEach(function (el) { this.add(el); }, this);
  }
};


Set.prototype.add = function add(el) {
  if (-1 === get_idx(this, el)) {
    this.__set_data__.push(el);
  }
};


Set.prototype.remove = function remove(el) {
  var i = get_idx(this, el), val = this.__set_data__[i];
  delete this.__set_data__[i];
  return val;
};


Set.prototype.toArray = function toArray() {
  return this.__set_data__.slice();
};
