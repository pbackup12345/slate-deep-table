"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import React, {withGlobal} from "reactn"

var style = {
  top: 0,
  right: -1,
  width: "8px",
  position: "absolute",
  cursor: "col-resize",
  userSelect: "none",
  height: "50px",
  zIndex: 2
};

var spanStyle = {
  top: "-5px",
  right: -5,
  position: "absolute",
  userSelect: "none",
  zIndex: 3,
  padding: "0px",
  height: "10px",
  opacity: 0,
  transition: "all 0.2s"
};

var Divider = function Divider(props) {
  var divRef = (0, _react.useRef)();
  (0, _react.useLayoutEffect)(function () {
    return divRef.current.style.height = divRef.current.parentElement.parentElement.parentElement.parentElement.offsetHeight + "px";
  }, []);

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
    if (e.target.nextElementSibling) {
      e.target.style.height = e.target.parentElement.parentElement.parentElement.parentElement.offsetHeight + "px";
      e.target.style.borderRight = "2px solid #0000ff";
      e.target.nextElementSibling.style.opacity = 1;
    } else {
      e.target.previousElementSibling.style.height = e.target.previousElementSibling.parentElement.parentElement.parentElement.parentElement.offsetHeight + "px";
      e.target.previousElementSibling.style.borderRight = "2px solid #0000ff";
      e.target.style.opacity = 1;
    }
  };

  var onMouseOut = function onMouseOut(e) {
    if (e.target.nextElementSibling) {
      e.target.style.borderRight = "";
      e.target.nextElementSibling.style.opacity = 0;
    } else {
      e.target.previousElementSibling.style.borderRight = "";
      e.target.style.opacity = 0;
    }
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
      ref: divRef,
      style: style,
      onMouseDown: onMouseDown,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut }),
    _react2.default.createElement(
      "div",
      {
        contentEditable: false,
        onClick: onClick,
        style: spanStyle,
        onMouseOver: onMouseOver,
        onMouseOut: onMouseOut },
      _react2.default.createElement(_core.Icon, { icon: "add", color: "green", iconSize: 10 })
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