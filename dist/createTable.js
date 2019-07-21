"use strict";

var _require = require("immutable"),
    Range = _require.Range;

var Slate = require("slate");
var createRow = require("./createRow");

/**
 * Create a table
 *
 * @param {Object} opts
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} textGetter
 * @return {Slate.Block}
 */
function createTable(opts, columns, rows, textGetter) {
  var properties = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var rowNodes = Range(0, rows).map(function (i) {
    return createRow(opts, columns, textGetter ? textGetter.bind(null, i) : null);
  }).toList();

  return Slate.Block.create({
    type: opts.typeTable,
    nodes: rowNodes,
    data: properties
  });
}

module.exports = createTable;