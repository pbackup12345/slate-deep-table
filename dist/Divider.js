"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactn = require("reactn");

var _reactn2 = _interopRequireDefault(_reactn);

var _core = require("@blueprintjs/core");

var _slateReact = require("slate-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import React, {withGlobal} from "reactn"

var Divider = function Divider(props) {
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
  var spanPlusStyle = {
    top: "0px",
    right: "-8px",
    position: "absolute",
    userSelect: "none",
    zIndex: 3,
    padding: "0px",
    height: "16px",
    width: "16px",
    opacity: 0,
    transition: "all 0.2s",
    background: "white",
    borderRadius: "16px",
    lineHeight: 1
  };
  var spanMinusStyle = {
    bottom: "0px",
    right: "-8px",
    position: "absolute",
    userSelect: "none",
    zIndex: 3,
    padding: "0px",
    height: "16px",
    width: "16px",
    opacity: 0,
    transition: "all 0.2s",
    background: "white",
    borderRadius: "16px",
    lineHeight: 1
  };

  if (props.first) {
    spanPlusStyle.right = undefined;
    spanPlusStyle.left = "-8px";
    spanMinusStyle.right = undefined;
    spanMinusStyle.left = "-8px";
    style.right = undefined;
    style.left = -1;
  }

  var divRef = (0, _reactn.useRef)();
  (0, _reactn.useLayoutEffect)(function () {
    divRef.current.style.height = divRef.current.parentElement.parentElement.parentElement.parentElement.offsetHeight + "px";
  }, []);

  var onMouseDown = function onMouseDown(e) {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    if (props.first) {
      return;
    }

    var thisElement = e.target.parentElement;
    var nextElement = thisElement.nextElementSibling;

    var padding = paddingDiff(thisElement);
    e.target.style.width = "20px";
    var newMouseMove = onMouseMove(thisElement, nextElement, e.pageX, thisElement.offsetWidth - padding, nextElement ? nextElement.offsetWidth - padding : undefined, thisElement.parentElement.parentElement.parentElement);

    var newMouseUp = onMouseUp(newMouseMove, newMouseUp, e.target);

    document.addEventListener("mouseup", newMouseUp);
    document.addEventListener("mousemove", newMouseMove);
  };

  var onClickAdd = function onClickAdd(e) {
    var editor = props.editor;
    editor.moveToRangeOfNode((0, _slateReact.findNode)(e.currentTarget, editor));

    if (props.first) {
      editor.insertColumn(0, e);
    } else {
      var position = editor.getTablePosition();
      editor.insertColumn(position.getColumnIndex(), e);
    }
  };

  var onClickRemove = function onClickRemove(e) {
    var editor = props.editor;
    editor.moveToRangeOfNode((0, _slateReact.findNode)(e.currentTarget, editor));
    var position = editor.getTablePosition();
    editor.removeColumn(position.getColumnIndex(), e);
  };

  var onMouseOver = function onMouseOver(e) {
    divRef.current.style.height = divRef.current.parentElement.parentElement.parentElement.parentElement.offsetHeight + "px";
    if (props.first) {
      divRef.current.style.borderLeft = "2px solid #0000ff";
    } else {
      divRef.current.style.borderRight = "2px solid #0000ff";
    }
    divRef.current.nextElementSibling.nextElementSibling.style.opacity = 1;
    divRef.current.nextElementSibling.style.opacity = 1;
  };

  var onMouseOut = function onMouseOut(e) {
    if (props.first) {
      divRef.current.style.borderLeft = "";
    } else {
      divRef.current.style.borderRight = "";
    }
    divRef.current.nextElementSibling.style.opacity = 0;
    divRef.current.nextElementSibling.nextElementSibling.style.opacity = 0;
  };

  var onMouseMove = function onMouseMove(curCol, nxtCol, pageX, curColWidth, nxtColWidth, table) {
    return function (e) {
      if (props.first) {
        return;
      }

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
      if (props.first) {
        return;
      }

      document.removeEventListener("mousemove", newMouseMove);
      document.removeEventListener("mouseup", newMouseUp);
      divider.style.width = "5px";
    };
  };

  return _reactn2.default.createElement(
    _reactn2.default.Fragment,
    null,
    _reactn2.default.createElement("div", {
      ref: divRef,
      style: style,
      onMouseDown: onMouseDown,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut }),
    _reactn2.default.createElement(
      "div",
      {
        contentEditable: false,
        onClick: onClickAdd,
        style: spanPlusStyle,
        onMouseOver: onMouseOver,
        onMouseOut: onMouseOut },
      _reactn2.default.createElement(_core.Icon, { icon: "add", color: "blue", iconSize: 16 })
    ),
    _reactn2.default.createElement(
      "div",
      {
        contentEditable: false,
        onClick: onClickRemove,
        style: spanMinusStyle,
        onMouseOver: onMouseOver,
        onMouseOut: onMouseOut },
      _reactn2.default.createElement(_core.Icon, { icon: "remove", color: "red", iconSize: 16 })
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