/// <reference types="typescript" />

declare module "@pbackup/slate-deep-table" {
  export interface DTable {
    typeCell: string;
    columnResize: boolean;
    tableResize: boolean;
    mouseDown: Function;
    mouseMove: Function;
    mouseUp: Function;
  }

  declare function EditTable(opts: DTable): function;

  export = EditTable;
}
