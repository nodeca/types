'use strict';


var Assert = require('assert');
var SortedSet = require('../lib/types/sorted-set');


require('vows').describe('SortedSet').addBatch({
  'Adding weights': {
    topic: function () {
      var s = new SortedSet();

      s.add(-10, '-10');
      s.add(-20, '-20');
      s.add(-30, '-30');
      s.add(30,  '+30');
      s.add(20,  '+20');
      s.add(10,  '+10');

      return s;
    },

    'weights are respected on sorting': function (s) {
      Assert.equal(s.sorted.join(','), '-30,-20,-10,+10,+20,+30');
    },

    'with same width': {
      topic: function (s) {
        s.add(0, '.');
        s.add(0, 'o');
        s.add(0, '@');

        return s;
      },

      'values are sorted in order of appearance': function (s) {
        Assert.equal(s.sorted.join(','), '-30,-20,-10,.,o,@,+10,+20,+30');
      }
    }
  }
}).export(module);
