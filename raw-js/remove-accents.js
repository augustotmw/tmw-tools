

/**
 * @function removeAccents
 * Remove characters accents
 * @param  {String} _string [string que contem os acentos]
 * @return {String}                 [string sem acentos]
 */
var removeAccents = function (_string) {
  var _map = {
      a: /[\xE0-\xE6]/g,
      e: /[\xE8-\xEB]/g,
      i: /[\xEC-\xEF]/g,
      o: /[\xF2-\xF6]/g,
      u: /[\xF9-\xFC]/g,
      c: /\xE7/g,
      n: /\xF1/g
  };

  for (var letter in _map) {
      var regex = _map[letter];
      string = string.replace(regex, letter);
  }
  return string;
}
