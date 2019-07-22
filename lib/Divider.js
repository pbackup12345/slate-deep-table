import React, { useLayoutEffect, useRef } from "reactn";
import { Icon } from "@blueprintjs/core";
import { findNode } from "slate-react";
//import React, {withGlobal} from "reactn"

const style = {
  top: 0,
  right: -1,
  width: "8px",
  position: "absolute",
  cursor: "col-resize",
  userSelect: "none",
  height: "50px",
  zIndex: 2,
};

const spanPlusStyle = {
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
  lineHeight: 1,
};

const spanMinusStyle = {
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
  lineHeight: 1,
};

const Divider = props => {
  if (props.first) {
    spanPlusStyle.right = undefined;
    spanPlusStyle.left = "-8px";
    spanMinusStyle.right = undefined;
    spanMinusStyle.left = "-8px";
  }

  const divRef = useRef();
  useLayoutEffect(() => {
    divRef.current.style.height =
      divRef.current.parentElement.parentElement.parentElement.parentElement.offsetHeight + "px";
  }, []);

  const onMouseDown = e => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    if (props.first) {
      return;
    }

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

  const onClickAdd = e => {
    const editor = props.editor;
    editor.moveToRangeOfNode(findNode(e.currentTarget, editor));

    if (props.first) {
      editor.insertColumn(0, e);
    } else {
      const position = editor.getTablePosition();
      editor.insertColumn(position.getColumnIndex(), e);
    }
  };

  const onClickRemove = e => {
    const editor = props.editor;
    editor.moveToRangeOfNode(findNode(e.currentTarget, editor));
    const position = editor.getTablePosition();
    editor.removeColumn(position.getColumnIndex(), e);
  };

  const onMouseOver = e => {
    divRef.current.style.height =
      divRef.current.parentElement.parentElement.parentElement.parentElement.offsetHeight + "px";
    divRef.current.style.borderRight = "2px solid #0000ff";
    divRef.current.nextElementSibling.nextElementSibling.style.opacity = 1;
    divRef.current.nextElementSibling.style.opacity = 1;
  };

  const onMouseOut = e => {
    divRef.current.style.borderRight = "";
    divRef.current.nextElementSibling.style.opacity = 0;
    divRef.current.nextElementSibling.nextElementSibling.style.opacity = 0;
  };

  const onMouseMove = (curCol, nxtCol, pageX, curColWidth, nxtColWidth, table) => e => {
    if (props.first) {
      return;
    }

    if (curCol) {
      const diffX = e.pageX - pageX;

      if (nxtCol) nxtCol.style.width = nxtColWidth - diffX + "px";

      curCol.style.width = curColWidth + diffX + "px";
      table.style.height = table.offsetHeight + "px";
    }
  };

  const onMouseUp = (newMouseMove, newMouseUp, divider) => e => {
    if (props.first) {
      return;
    }

    document.removeEventListener("mousemove", newMouseMove);
    document.removeEventListener("mouseup", newMouseUp);
    divider.style.width = "5px";
  };

  return (
    <React.Fragment>
      <div
        ref={divRef}
        style={style}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}></div>
      <div
        contentEditable={false}
        onClick={onClickAdd}
        style={spanPlusStyle}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
        <Icon icon="add" color="blue" iconSize={16} />
      </div>
      <div
        contentEditable={false}
        onClick={onClickRemove}
        style={spanMinusStyle}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
        <Icon icon="remove" color="red" iconSize={16} />
      </div>
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
