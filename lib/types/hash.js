/**
 *  class Hash
 *
 *  Provides hashtable, where keys can be anything
 *
 *      var o1 = {},
 *          o2 = {},
 *          hash = new Hash();
 *
 *      hash.store(o1, 'abc');
 *      hash.store(o2, 'def');
 *
 *      hash.get(o1); // -> 'abc'
 *      hash.get(o2); // -> 'def'
 *      hash.get({}); // -> undefined
 **/


'use strict';


function key_idx(self, key) {
  return self.__hash_keys__.indexOf(key);
}


/**
 *  new Hash([defaultValue])
 *  - defaultValue (Mixed): value returned by [[Hash#get]] when key not found.
 *
 *  Creates new instance of Hash.
 *
 *      var h1 = new Hash(-1);
 *      h1.get('test');
 *      // -> -1
 *
 *      var h2 = new Hash();
 *      h2.get('test');
 *      // -> undefined
 **/
var Hash = module.export = function Hash(defaultValue) {
  this.__hash_index__ = 0;
  this.__hash_keys__ = [];
  this.__hash_vals__ = [];
  this.__default_value__ = defaultValue;
};


/**
 *  Hash#store(key, val) -> Void
 *  - key (Mixed): Key. Can be any object (not only a string or number).
 *  - val (Mixed): Value.
 *
 *  Associated `key` with `val`.
 *
 *  ##### Example
 *
 *      hash.store(123,           'abc');
 *      hash.store('string key',  'def');
 *      hash.store([1, 2, 3],     'ghi');
 *      hash.store({even: 'obj'}, 'jkl');
 *
 *  ##### Warning
 *
 *  Native JS Object allows only keys, so it stringifies any key you give to it,
 *  thus array `[1, 2, 3]` becomes `[1,2,3]` (string) when used as key, and
 *  any object becomes something like `[object Object]`.
 *
 *  Hash do not stringifies or anyhow modifies given object. That meanse that
 *  two instances of arrays (even with same values) are in fact different
 *  objects. See example:
 *
 *      var a1 = [1,2,3], a2 = [1,2,3];
 *
 *      hash.store(a1, 'A1');
 *      hash.store(a2, 'A2');
 *
 *      hash.get(a1); // -> 'A1'
 *      hash.get(a2); // -> 'A2'
 *
 *      // Similar to:
 *
 *      var o1 = {foo: 'bar'}, o2 = {foo: 'bar'};
 *
 *      hash.store(o1, 'O1');
 *      hash.store(o2, 'O2');
 *
 *      hash.get(o1); // -> 'O1'
 *      hash.get(o2); // -> 'O2'
 *
 **/
Hash.prototype.store = function store(key, val) {
  var i = this.__hash_keys__.indexOf(key);

  if (0 <= i) {
    this.__hash_vals__[i] = val;
    return;
  }

  i = this.__hash_index__;
  this.__hash_index__ += 1;

  this.__hash_keys__[i] = key;
  this.__hash_vals__[i] = val;
};


/**
 *  Hash#remove(key) -> Mixed
 *  - key (Mixed): Key to remove.
 *
 *  Removes given `key` and returns associated value.
 *
 *  ##### Example
 *
 *      var key = {};
 *
 *      hash.store(key, 'abc');
 *      hash.get(key); // -> 'abc'
 *      hash.remove(key); // -> 'abc'
 *      hash.get(key); // -> undefined
 **/
Hash.prototype.remove = function remove(key) {
  var i = key_idx(this, key), val = this.__hash_vals__[i];

  if (0 <= i) {
    delete this.__hash_keys__[i];
    delete this.__hash_vals__[i];
  }

  return val;
};


/**
 *  Hash#hasKey(key) -> Boolean
 *  - key (Mixed): Key of check.
 *
 *  Returns boolean `TRUE` whenever `key` present in the hash.
 *
 *  ##### Example
 *
 *      var k1 = {}, k2 = {};
 *
 *      hash.store(key, 'abc');
 *      hash.hasKey(k1); // -> true
 *      hash.hasKey(k2); // -> false
 **/
Hash.prototype.hasKey = function hasKey(key) {
  return 0 <= key_idx(this, key);
};


/**
 *  Hash#get(key) -> Mixed
 *  - key (Mixed): Key of the value to retreive.
 *
 *  Returns value associated with `key`.
 *
 *  ##### Example
 *
 *      var k1 = {}, k2 = {};
 *
 *      hash.store(key, 'abc');
 *      hash.get(k1); // -> 'abc'
 *      hash.get(k2); // -> undefined
 **/
Hash.prototype.get = function get(key) {
  var i = key_idx(this, key);
  return (0 <= i) ? this.__hash_vals__[i] : this.__default_value__;
};


/**
 *  Hash#isEmpty() -> Boolean
 *
 *  Returns boolean `TRUE` whenever hash has no elements.
 *
 *  ##### Example
 *
 *      var key = {};
 *
 *      hash.isEmpty();
 *      // -> true
 *
 *      hash.store(key, 'abc');
 *      hash.isEmpty();
 *      // -> false
 *
 *      hash.remove(key);
 *      hash.isEmpty();
 *      // -> true
 **/
Hash.prototype.isEmpty = function isEmpty() {
  return 0 === this.__hash_keys__.length;
};


/**
 *  Hash#count -> Number
 *
 *  Returns amount of hash elements.
 *
 *  ##### Example
 *
 *      var key = {};
 *
 *      hash.count
 *      // -> 0
 *
 *      hash.store(key, 'abc');
 *      hash.count
 *      // -> 1
 *
 *      hash.remove(key);
 *      hash.count
 *      // -> 0
 **/
Hash.prototype.__defineGetter__('count', function count() {
  return this.__hash_keys__.length;
});


/** alias: Hash.new
 *  Hash.create() -> SortedSet
 *
 *  Constructor proxy.
 **/
Hash.create = function create(defaultValue) {
  return new Hash(defaultValue);
};
