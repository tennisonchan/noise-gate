(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.NoiseGateNode = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FILTER_PARAMS = ['type', 'frequency', 'gain', 'detune', 'Q'];
var COMPRESSOR_PARAMS = ['threshold', 'knee', 'ratio', 'attack', 'release'];
var DEFAULT_OPTIONS = {
  threshold: -50,
  knee: 40,
  ratio: 12,
  reduction: -20,
  attack: 0,
  release: 0.25,
  Q: 8.30,
  frequency: 355,
  gain: 3.0,
  type: 'bandpass'
};

var NoiseGateNode = function () {
  function NoiseGateNode(audioCtx) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, NoiseGateNode);

    options = Object.assign({}, DEFAULT_OPTIONS, options);

    var compressorPramas = this.selectParams(options, COMPRESSOR_PARAMS);
    var filterPramas = this.selectParams(options, FILTER_PARAMS);

    this.compressor = new DynamicsCompressorNode(audioCtx, compressorPramas);
    this.filter = new BiquadFilterNode(audioCtx, filterPramas);

    this.compressor.connect(this.filter);

    return this.filter;
  }

  _createClass(NoiseGateNode, [{
    key: 'selectParams',
    value: function selectParams(object, filterArr) {
      return Object.keys(object).reduce(function (opt, p) {
        if (filterArr.includes(p)) {
          opt[p] = object[p];
        }
        return opt;
      }, {});
    }
  }, {
    key: 'setParams',
    value: function setParams(node, audioParams) {
      for (var param in audioParams) {
        var value = audioParams[param];
        if (node[param] instanceof AudioParam) {
          node[param].value = value;
        } else {
          node[param] = value;
        }
      }
    }
  }]);

  return NoiseGateNode;
}();

exports = module.exports = NoiseGateNode;

},{}]},{},[1])(1)
});