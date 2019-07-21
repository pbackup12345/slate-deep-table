import Divider from "./Divider";
import Resizer from "./Resizer";
const React = require("react");
const TablePosition = require("./TablePosition");

/**
 * split rows into thead contens and body contents,
 * unless "headless" option is set
 */
const splitHeader = props => {
  const rows = props.children;
  const header = !props.node.get("data").get("headless");

  if (!header || !rows || !rows.length || rows.length === 1) {
    return { header: null, rows: rows };
  }
  return {
    header: rows[0],
    rows: rows.slice(1)
  };
};

const defaultCellProperties = {
  className: "",
  style: {}
};

const defaultRowProperties = {
  className: "",
  style: {}
};

const defaultTableProperties = {
  wrapperClassName: "",
  wrapperStyle: {},
  tableClassName: "",
  tableStyle: {},
  theadClassName: "",
  theadStyle: {},
  tbodyClassName: "",
  tbodyStyle: {}
};

const noop = () => {};

/**
 * default renderers for easier use in your own schema
 * @param {Object} opts The same opts passed into plugin instance
 */
const makeRenderers = (
  opts = { mouseDown: noop, mouseUp: noop, mouseMove: noop }
) => (props, editor, next) => {
  let properties;
  switch (props.node.type) {
    case opts.typeTable:
      const { header, rows } = splitHeader(props);
      properties = {
        ...defaultTableProperties,
        ...(props.node.data.toJS() || {})
      };
      return (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            ...(properties.wrapperStyle || {})
          }}
          className={properties.wrapperClassName}>
          <table
            className={properties.tableClassName}
            style={properties.tableStyle || {}}>
            {header && (
              <thead
                className={properties.theadClassName}
                style={properties.theadStyle || {}}
                {...props.attributes}>
                {header}
              </thead>
            )}
            <tbody
              className={properties.tbodyClassName}
              style={properties.tbodyStyle || {}}
              {...props.attributes}>
              {rows}
            </tbody>
          </table>
          {opts.tableResize || props.node.data.get("tableResize") ? (
            <Resizer />
          ) : (
            ""
          )}
        </div>
      );
    case opts.typeRow:
      properties = {
        ...defaultRowProperties,
        ...props.node.data.toJS()
      };

      return (
        <tr
          className={properties.className}
          style={properties.style}
          {...props.attributes}>
          {props.children}
        </tr>
      );
    case opts.typeCell:
      properties = {
        ...defaultCellProperties,
        ...props.node.data.toJS()
      };
      const attributes = props.node.data.get("attributes") || {};
      const row = props.editor.value.document.getParent(props.node.key);
      const prevRow = props.editor.value.document.getPreviousSibling(row.key);
      const table = props.editor.value.document.getParent(row.key);
      const headerless = table.data.get("headless");
      return (
        <React.Fragment>
          {prevRow || headerless ? (
            <React.Fragment>
              <td
                onMouseDown={opts.mouseDown}
                onMouseMove={opts.mouseMove}
                onMouseUp={opts.mouseUp}
                className={properties.className}
                style={properties.style}
                {...attributes}
                {...props.attributes}>
                {props.children}
                {(opts.columnResize || table.data.get("columnResize")) &&
                !prevRow ? (
                  <Divider editor={props.editor} node={props.node} />
                ) : (
                  ""
                )}
              </td>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <th
                onMouseDown={opts.mouseDown}
                onMouseMove={opts.mouseMove}
                onMouseUp={opts.mouseUp}
                className={properties.className}
                style={properties.style}
                colSpan={properties.colSpan}
                rowSpan={properties.rowSpan}
                {...attributes}
                {...props.attributes}>
                {props.children}
                {opts.columnResize || table.data.get("columnResize") ? (
                  <Divider editor={props.editor} node={props.node} />
                ) : (
                  ""
                )}
              </th>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    default:
      return next();
  }
};

module.exports = makeRenderers;
