"use strict";

var _require = require("slate-react"),
    findNode = _require.findNode;

var _require2 = require("immutable"),
    List = _require2.List;

var TablePosition = require("../TablePosition");
var moveSelection = require("./moveSelection");
var createCell = require("../createCell");

/**
 * Insert a new column in current table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} at
 * @return {Slate.Editor}
 */
function insertColumn(opts, editor, at) {
  var e = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var value = editor.value;

  var startBlock = e ? findNode(e.target) : value.startBlock;

  var pos = TablePosition.create(value, startBlock, opts);
  var table = pos.table;


  if (typeof at === "undefined") {
    at = pos.getColumnIndex() + 1;
  }

  // Insert the new cell
  editor.withoutNormalizing(function () {
    table.nodes.forEach(function (row) {
      var newCell = createCell(opts);
      editor.insertNodeByKey(row.key, at, newCell);
    });
  });

  // Update the selection (not doing can break the undo)
  return moveSelection(opts, editor, pos.getColumnIndex() + 1, pos.getRowIndex());
}

module.exports = insertColumn;