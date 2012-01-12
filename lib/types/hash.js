/**
 *  class Hash
 **/


'use strict';


function key_idx(self, key) {
  return self.__hash_keys__.indexOf(key);
}


// Simple implementation of hashtable
var Hash = module.export = function Hash(defaultValue) {
  this.__hash_index__ = 0;
  this.__hash_keys__ = [];
  this.__hash_vals__ = [];
  this.__default_value__ = defaultValue;
};


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


Hash.prototype.remove = function remove(key) {
  var i = key_idx(this, key);

  if (0 <= i) {
    delete this.__hash_keys__[i];
    delete this.__hash_vals__[i];
  }
};


Hash.prototype.hasKey = function hasKey(key) {
  return 0 <= key_idx(this, key);
};


Hash.prototype.get = function get(key) {
  var i = key_idx(this, key);
  return (0 <= i) ? this.__hash_vals__[i] : this.__default_value__;
};


Hash.prototype.isEmpty = function isEmpty() {
  return 0 === this.__hash_keys__.length;
};


Hash.prototype.__defineGetter__('count', function count() {
  return this.__hash_keys__.length;
});


Hash.create = function create(defaultValue) {
  return new Hash(defaultValue);
};
