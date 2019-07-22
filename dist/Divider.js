"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _v = require("uuid/v4");

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// uuidv4()
//import React, {withGlobal} from "reactn"

var style = {
  top: 0,
  right: -1,
  width: "5px",
  position: "absolute",
  cursor: "col-resize",
  userSelect: "none",
  height: "50px",
  zIndex: 2
};

var spanStyle = {
  top: 0,
  right: -3,
  position: "absolute",
  userSelect: "none",
  zIndex: 3
};

var Divider = function Divider(props) {
  var onMouseDown = function onMouseDown(e) {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    var thisElement = e.target.parentElement;
    var nextElement = thisElement.nextElementSibling;

    var padding = paddingDiff(thisElement);
    e.target.style.width = "20px";
    var newMouseMove = onMouseMove(thisElement, nextElement, e.pageX, thisElement.offsetWidth - padding, nextElement ? nextElement.offsetWidth - padding : undefined, thisElement.parentElement.parentElement.parentElement);

    var newMouseUp = onMouseUp(newMouseMove, newMouseUp, e.target);

    document.addEventListener("mouseup", newMouseUp);
    document.addEventListener("mousemove", newMouseMove);
  };

  var onClick = function onClick(e) {
    console.log("huba");
  };

  var onMouseOver = function onMouseOver(e) {
    e.target.style.height = e.target.parentElement.parentElement.parentElement.parentElement.offsetHeight + "px";
    e.target.style.borderRight = "2px solid #0000ff";
  };

  var onMouseOut = function onMouseOut(e) {
    e.target.style.borderRight = "";
  };

  var onMouseMove = function onMouseMove(curCol, nxtCol, pageX, curColWidth, nxtColWidth, table) {
    return function (e) {
      if (curCol) {
        var diffX = e.pageX - pageX;

        if (nxtCol) nxtCol.style.width = nxtColWidth - diffX + "px";

        curCol.style.width = curColWidth + diffX + "px";
        table.style.height = table.offsetHeight + "px";
      }
    };
  };

  var onMouseUp = function onMouseUp(newMouseMove, newMouseUp, divider) {
    return function (e) {
      document.removeEventListener("mousemove", newMouseMove);
      document.removeEventListener("mouseup", newMouseUp);
      divider.style.width = "5px";
    };
  };

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement("div", {
      style: style,
      onMouseDown: onMouseDown,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut }),
    _react2.default.createElement(
      "span",
      { onClick: onClick, style: spanStyle },
      "p"
    )
  );
};

function paddingDiff(col) {
  if (getStyleVal(col, "box-sizing") === "border-box") {
    return 0;
  }

  var padLeft = getStyleVal(col, "padding-left");
  var padRight = getStyleVal(col, "padding-right");
  return parseInt(padLeft) + parseInt(padRight);
}

function getStyleVal(elm, css) {
  return window.getComputedStyle(elm, null).getPropertyValue(css);
}

//const mapStateToProps = global => {
//  return { value: global.value };
//};

//export default withGlobal(mapStateToProps,null)(Divider);
exports.default = Divider;