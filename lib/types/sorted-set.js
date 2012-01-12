/**
 *  class SortedSet
 *
 *  Provides easy way to build sequences of objects (or functions) based on
 *  priority weight.
 *
 *  ##### Example
 *
 *      var set = new SortedSet();
 *
 *      set.add(20, 'World!').add(10, 'Hello');
 *      set.sorted.join(' ');
 *      // -> Hello World!
 *
 *      set.add(10, ', Cruel');
 *      set.sorted.join(' ');
 *      // -> Hello, Cruel World!
 **/


'use strict';


// callback for Array#sort to sort numbers adequately :))
function sort_nums_asc(a, b) {
  return a - b;
}


// returns sequence array for given weight
function get_sequence(self, weight) {
  if (undefined === self.__sequences__[weight]) {
    self.__sequences__[weight] = [];
  }

  return self.__sequences__[weight];
}


/**
 *  new SortedSet()
 **/
var SortedSet = module.exports = function SortedSet() {
  this.__sequences__ = {};
};


/** chainable
 *  SortedSet#add(weight, val) -> SortedSet
 *  - weight (Number): Weight of value
 *  - val (Mixed): Any value
 *
 *  Appends `val` into the set with given `weight`.
 **/
SortedSet.prototype.add = function(weight, val) {
  get_sequence(this, +weight).push(val);
  return this;
};


/**
 *  SortedSet#sorted -> Array
 *
 *  Returns array of all values sorted according to their weights
 *
 *  ##### Example
 *
 *      set.add(20, 'b').add(30, 'c').add(10, 'a');
 *      set.flatten().join('');
 *      // -> abc
 **/
SortedSet.prototype.__defineGetter__('sorted', function sorted() {
  var arr = [], self = this;

  function iterator(weight) {
    get_sequence(self, weight).forEach(function (val) {
      arr.push(val);
    });
  }

  Object.getOwnPropertyNames(this.__sequences__)
    .sort(sort_nums_asc)
    .forEach(iterator);

  return arr;
});


/** alias: SortedSet.new
 *  SortedSet.create() -> SortedSet
 **/
SortedSet.create = function () {
  return new SortedSet();
};
