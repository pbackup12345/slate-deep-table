"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n          bottom: 0;\n          right: 0;\n          position: absolute;\n          cursor: nw-resize;\n          user-select: none;\n          z-index: 2;\n          width: 10px;\n          height: 10px;\n          margin: 0 3px 3px 0;\n          border-right: 1px solid grey;\n          border-bottom: 1px solid grey;\n          &:active:after {\n            position: absolute;\n            top: 20px;\n            font-size: 11px;\n            content: attr(data-line);\n            background: white;\n            padding: 2px;\n            border: 1px solid grey;\n            border-radius: 3px;\n          }\n        "], ["\n          bottom: 0;\n          right: 0;\n          position: absolute;\n          cursor: nw-resize;\n          user-select: none;\n          z-index: 2;\n          width: 10px;\n          height: 10px;\n          margin: 0 3px 3px 0;\n          border-right: 1px solid grey;\n          border-bottom: 1px solid grey;\n          &:active:after {\n            position: absolute;\n            top: 20px;\n            font-size: 11px;\n            content: attr(data-line);\n            background: white;\n            padding: 2px;\n            border: 1px solid grey;\n            border-radius: 3px;\n          }\n        "]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /** @jsx jsx */


//import React, {withGlobal} from "reactn"
var style = {
  bottom: 0,
  right: 0,
  width: "5px",
  position: "absolute",
  cursor: "nw-resize",
  userSelect: "none",
  height: "5px",
  zIndex: 2,
  background: "lightgrey"
};

var Resizer = function Resizer(props) {
  var onMouseDown = function onMouseDown(e) {
    e.persist();
    e.stopPropagation();
    e.preventDefault();
    var thisElement = e.target.previousElementSibling;

    var padding = paddingDiff(thisElement);
    var origWidth = thisElement.offsetWidth - padding;
    var origHeight = thisElement.offsetHeight - padding;

    var newMouseMove = onMouseMove(thisElement, e.pageX, e.pageY, thisElement.offsetWidth - padding, thisElement.offsetHeight - padding, e.target);
    e.target.parentElement.style.width = thisElement.offsetWidth;
    e.target.parentElement.style.height = thisElement.offsetHeight;

    var newMouseUp = onMouseUp(newMouseMove, newMouseUp, e.target);

    e.target.setAttribute("data-line", origWidth + "\xa0x\xa0" + origHeight);

    document.addEventListener("mouseup", newMouseUp);
    document.addEventListener("mousemove", newMouseMove);
  };

  var onMouseMove = function onMouseMove(thisTable, pageX, pageY, origWidth, origHeight, sizer) {
    return function (e) {
      if (thisTable) {
        var diffX = e.pageX - pageX;
        var diffY = e.pageY - pageY;

        sizer.setAttribute("data-line", parseInt(origWidth + diffX) + "\xa0x\xa0" + parseInt(origHeight + diffY));

        var tempHeight = thisTable.style.height;
        var tempWidth = thisTable.style.width;

        //sizer.parentElement.style.width = origWidth + diffX + "px";
        //sizer.parentElement.style.height = origHeight + diffY + "px";

        thisTable.style.width = origWidth + diffX + "px";
        thisTable.style.height = origHeight + diffY + "px";
      }
    };
  };

  var onMouseUp = function onMouseUp(newMouseMove, newMouseUp, divider) {
    return function (e) {
      document.removeEventListener("mousemove", newMouseMove);
      document.removeEventListener("mouseup", newMouseUp);
      divider.setAttribute("data-line", "");
    };
  };

  return (0, _core.jsx)(
    _react2.default.Fragment,
    null,
    (0, _core.jsx)("div", {
      "data-line": "",
      css: (0, _core.css)(_templateObject),
      onMouseDown: onMouseDown
    })
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

//export default withGlobal(mapStateToProps,null)(Resizer);
exports.default = Resizer;