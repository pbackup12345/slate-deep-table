import Divider from "./Divider";
import Resizer from "./Resizer";
const React = require("react");

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

/**
 * default renderers for easier use in your own schema
 * @param {Object} opts The same opts passed into plugin instance
 */
const makeRenderers = (opts = {}) => (props, editor, next) => {
  switch (props.node.type) {
    case "paragraph":
      return <p {...props.attributes}>{props.children}</p>;
    case "heading":
      return <h1 {...props.attributes}>{props.children}</h1>;
    case "subheading":
      return <h2 {...props.attributes}>{props.children}</h2>;
    case opts.typeTable:
      const { header, rows } = splitHeader(props);
      return (
        <div style={{ position: "relative", display: "inline-block" }}>
          <table>
            {header && <thead {...props.attributes}>{header}</thead>}
            <tbody {...props.attributes}>{rows}</tbody>
          </table>
          {opts.tableResize ? <Resizer /> : ""}
        </div>
      );
    case opts.typeRow:
      return <tr {...props.attributes}>{props.children}</tr>;
    case opts.typeCell:
      const row = props.editor.value.document.getParent(props.node.key);
      const prevRow = props.editor.value.document.getPreviousSibling(row.key);
      return (
        <React.Fragment>
          <td {...props.attributes}>
            {props.children}
            {!prevRow && opts.columnResize ? (
              <Divider editor={props.editor} node={props.node} />
            ) : (
              ""
            )}
          </td>
        </React.Fragment>
      );
    default:
      return next();
  }
};

module.exports = makeRenderers;
