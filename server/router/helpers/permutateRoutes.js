const path = require('path');
const allTheRoutes = [];

/******* Heap's Permutation Algorithm *********/
const swap = function(array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};

const heapsPermute = function(array, output, n) {
  n = n || array.length; // set n default to array.length
  if (n === 1) {
    output(array);
  } else {
    for (var i = 1; i <= n; i += 1) {
      heapsPermute(array, output, n - 1);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
    }
  }
};
/******* end Heap's Permutation Algorithm *********/

let allRouterOptions = [];

let buildRoutes = function(routeParts) {
  let string = '';
  routeParts.forEach((element) => {
    string += '/' + element + '.:' + element + '?';
  });
  allRouterOptions.push(string);
}

module.exports = function(array) {
  heapsPermute(array, buildRoutes);
  return allRouterOptions;
}
