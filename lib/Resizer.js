/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
//import React, {withGlobal} from "reactn"
const style = {
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

const Resizer = props => {
  const onMouseDown = e => {
    e.persist();
    e.stopPropagation();
    e.preventDefault();
    const thisElement = e.target.previousElementSibling;

    const padding = paddingDiff(thisElement);
    const origWidth = thisElement.offsetWidth - padding;
    const origHeight = thisElement.offsetHeight - padding;

    const newMouseMove = onMouseMove(
      thisElement,
      e.pageX,
      e.pageY,
      thisElement.offsetWidth - padding,
      thisElement.offsetHeight - padding,
      e.target
    );
    e.target.parentElement.style.width = thisElement.offsetWidth;
    e.target.parentElement.style.height = thisElement.offsetHeight;

    const newMouseUp = onMouseUp(newMouseMove, newMouseUp, e.target);

    e.target.setAttribute("data-line", origWidth + "\xa0x\xa0" + origHeight);

    document.addEventListener("mouseup", newMouseUp);
    document.addEventListener("mousemove", newMouseMove);
  };

  const onMouseMove = (
    thisTable,
    pageX,
    pageY,
    origWidth,
    origHeight,
    sizer
  ) => e => {
    if (thisTable) {
      const diffX = e.pageX - pageX;
      const diffY = e.pageY - pageY;

      sizer.setAttribute(
        "data-line",
        parseInt(origWidth + diffX) + "\xa0x\xa0" + parseInt(origHeight + diffY)
      );

      const tempHeight = thisTable.style.height;
      const tempWidth = thisTable.style.width;

      //sizer.parentElement.style.width = origWidth + diffX + "px";
      //sizer.parentElement.style.height = origHeight + diffY + "px";

      thisTable.style.width = origWidth + diffX + "px";
      thisTable.style.height = origHeight + diffY + "px";
    }
  };

  const onMouseUp = (newMouseMove, newMouseUp, divider) => e => {
    document.removeEventListener("mousemove", newMouseMove);
    document.removeEventListener("mouseup", newMouseUp);
    divider.setAttribute("data-line", "");
  };

  return (
    <React.Fragment>
      <div
        data-line={""}
        css={css`
          bottom: 0;
          right: 0;
          position: absolute;
          cursor: nw-resize;
          user-select: none;
          z-index: 2;
          width: 10px;
          height: 10px;
          margin: 0 3px 3px 0;
          border-right: 1px solid grey;
          border-bottom: 1px solid grey;
          &:active:after {
            position: absolute;
            top: 20px;
            font-size: 11px;
            content: attr(data-line);
            background: white;
            padding: 2px;
            border: 1px solid grey;
            border-radius: 3px;
          }
        `}
        onMouseDown={onMouseDown}
      />
    </React.Fragment>
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
export default Resizer;
