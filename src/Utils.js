const hexRgb = require('hex-rgb');

// get rgba
export const adjustRBGAlphaCss = (hex, alpha) => {

  const rgba = hexRgb(hex, {format: 'array'});
  const adjustedRgba = "rgba(" + rgba[0] + "," + rgba[1] + "," + rgba[2] + "," + alpha +")";

  return adjustedRgba
};
