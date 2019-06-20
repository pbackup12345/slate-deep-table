import React, { useState } from "react";
import uuidv4 from "uuid/v4"; // uuidv4()
//import React, {withGlobal} from "reactn"

const style = {
  top: 0,
  right: -1,
  width: "5px",
  position: "absolute",
  cursor: "col-resize",
  userSelect: "none",
  height: "50px",
  zIndex: 2
};

const Divider = props => {
  const onMouseDown = e => {
    e.persist();
    const thisElement = e.target.parentElement;
    const nextElement = thisElement.nextElementSibling;

    const padding = paddingDiff(thisElement);
    e.target.style.width = "20px";
    const newMouseMove = onMouseMove(
      thisElement,
      nextElement,
      e.pageX,
      thisElement.offsetWidth - padding,
      nextElement ? nextElement.offsetWidth - padding : undefined,
      thisElement.parentElement.parentElement.parentElement
    );

    const newMouseUp = onMouseUp(newMouseMove, newMouseUp, e.target);

    document.addEventListener("mouseup", newMouseUp);
    document.addEventListener("mousemove", newMouseMove);
  };

  const onMouseOver = e => {
    e.target.style.height =
      e.target.parentElement.parentElement.parentElement.parentElement
        .offsetHeight + "px";
    e.target.style.borderRight = "2px solid #0000ff";
  };

  const onMouseOut = e => {
    e.target.style.borderRight = "";
  };

  const onMouseMove = (
    curCol,
    nxtCol,
    pageX,
    curColWidth,
    nxtColWidth,
    table
  ) => e => {
    if (curCol) {
      const diffX = e.pageX - pageX;

      if (nxtCol) nxtCol.style.width = nxtColWidth - diffX + "px";

      curCol.style.width = curColWidth + diffX + "px";
      table.style.height = table.offsetHeight + "px";
    }
  };

  const onMouseUp = (newMouseMove, newMouseUp, divider) => e => {
    document.removeEventListener("mousemove", newMouseMove);
    document.removeEventListener("mouseup", newMouseUp);
    divider.style.width = "5px";
  };

  return (
    <React.Fragment>
      <div
        style={style}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
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

//export default withGlobal(mapStateToProps,null)(Divider);
export default Divider;
