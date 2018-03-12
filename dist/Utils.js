'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hexRgb = require('hex-rgb');

// get rgba
var adjustRBGAlphaCss = exports.adjustRBGAlphaCss = function adjustRBGAlphaCss(hex, alpha) {

  var rgba = hexRgb(hex, { format: 'array' });
  var adjustedRgba = "rgba(" + rgba[0] + "," + rgba[1] + "," + rgba[2] + "," + alpha + ")";

  return adjustedRgba;
};