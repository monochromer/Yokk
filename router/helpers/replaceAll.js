'use strict'

module.exports = function(stringToWorkWith, delimiter1, delimiter2) {
  const newString = stringToWorkWith.split(delimiter1).join(delimiter2);
  return newString;
}
