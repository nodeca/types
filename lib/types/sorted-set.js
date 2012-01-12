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
function sort_numbers_asc(a, b) {
  return a - b;
}


/**
 *  new SortedSet()
 **/
var SortedSet = module.exports = function SortedSet() {
  var that = this,
      sequences = {},
      get_sequence = function get_sequence(priority) {
        if (undefined === sequences[priority]) {
          sequences[priority] = [];
        }

        return sequences[priority];
      };


  /** chainable
   *  SortedSet#add(weight, val) -> SortedSet
   *  - weight (Number): Weight of value
   *  - val (Mixed): Any value
   *
   *  Appends `val` into the set with given `weight`.
   **/
  this.add = function add(weight, obj) {
    get_sequence(+weight).push(obj);
    return that;
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
  this.__defineGetter__('sorted', function sorted() {
    var arr = [];

    Object.getOwnPropertyNames(sequences).sort(sort_numbers_asc).forEach(function (weight) {
      get_sequence(weight).forEach(function (obj) {
        arr.push(obj);
      });
    });

    return arr;
  });
};


/** alias: SortedSet.new
 *  SortedSet.create() -> SortedSet
 **/
SortedSet.create = function () {
  return new SortedSet();
};
