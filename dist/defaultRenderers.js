"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Divider = require("./Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _Resizer = require("./Resizer");

var _Resizer2 = _interopRequireDefault(_Resizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require("react");
var TablePosition = require("./TablePosition");

/**
 * split rows into thead contens and body contents,
 * unless "headless" option is set
 */
var splitHeader = function splitHeader(props) {
  var rows = props.children;
  var header = !props.node.get("data").get("headless");

  if (!header || !rows || !rows.length || rows.length === 1) {
    return { header: null, rows: rows };
  }
  return {
    header: rows[0],
    rows: rows.slice(1)
  };
};

var defaultCellProperties = {
  className: "",
  style: {}
};

var defaultRowProperties = {
  className: "",
  style: {}
};

var defaultTableProperties = {
  wrapperClassName: "",
  wrapperStyle: {},
  tableClassName: "",
  tableStyle: {},
  theadClassName: "",
  theadStyle: {},
  tbodyClassName: "",
  tbodyStyle: {}
};

var noop = function noop() {};

/**
 * default renderers for easier use in your own schema
 * @param {Object} opts The same opts passed into plugin instance
 */
var makeRenderers = function makeRenderers() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { mouseDown: noop, mouseUp: noop, mouseMove: noop };
  return function (props, editor, next) {
    var properties = void 0;
    switch (props.node.type) {
      case opts.typeTable:
        var _splitHeader = splitHeader(props),
            header = _splitHeader.header,
            rows = _splitHeader.rows;

        properties = _extends({}, defaultTableProperties, props.node.data.toJS() || {});
        return React.createElement(
          "div",
          {
            style: _extends({
              position: "relative",
              display: "inline-block"
            }, properties.wrapperStyle || {}),
            className: properties.wrapperClassName },
          React.createElement(
            "table",
            {
              className: properties.tableClassName,
              style: properties.tableStyle || {} },
            header && React.createElement(
              "thead",
              _extends({
                className: properties.theadClassName,
                style: properties.theadStyle || {}
              }, props.attributes),
              header
            ),
            React.createElement(
              "tbody",
              _extends({
                className: properties.tbodyClassName,
                style: properties.tbodyStyle || {}
              }, props.attributes),
              rows
            )
          ),
          opts.tableResize || props.node.data.get("tableResize") ? React.createElement(_Resizer2.default, null) : ""
        );
      case opts.typeRow:
        properties = _extends({}, defaultRowProperties, props.node.data.toJS());

        return React.createElement(
          "tr",
          _extends({
            className: properties.className,
            style: properties.style
          }, props.attributes),
          props.children
        );
      case opts.typeCell:
        properties = _extends({}, defaultCellProperties, props.node.data.toJS());
        var attributes = props.node.data.get("attributes") || {};
        var row = props.editor.value.document.getParent(props.node.key);
        var prevRow = props.editor.value.document.getPreviousSibling(row.key);
        var table = props.editor.value.document.getParent(row.key);
        var headerless = table.data.get("headless");
        return React.createElement(
          React.Fragment,
          null,
          prevRow || headerless ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "td",
              _extends({
                onMouseDown: opts.mouseDown,
                onMouseMove: opts.mouseMove,
                onMouseUp: opts.mouseUp,
                className: properties.className,
                style: properties.style
              }, attributes, props.attributes),
              props.children,
              (opts.columnResize || table.data.get("columnResize")) && !prevRow ? React.createElement(_Divider2.default, { editor: props.editor, node: props.node }) : ""
            )
          ) : React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "th",
              _extends({
                onMouseDown: opts.mouseDown,
                onMouseMove: opts.mouseMove,
                onMouseUp: opts.mouseUp,
                className: properties.className,
                style: properties.style,
                colSpan: properties.colSpan,
                rowSpan: properties.rowSpan
              }, attributes, props.attributes),
              props.children,
              opts.columnResize || table.data.get("columnResize") ? React.createElement(_Divider2.default, { editor: props.editor, node: props.node }) : ""
            )
          )
        );
      default:
        return next();
    }
  };
};

module.exports = makeRenderers;