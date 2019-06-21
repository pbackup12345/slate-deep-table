# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.9.5] - 2019-06-21

- Table, row and cell can now take attributes through slate "data" property
- Cells can have now colspans
- Normalization taken out as it was only making sure of the cell numbers in rows really

## [0.9.2] - 2019-06-20

- Added column resize option
- Added table resize option

## [0.9.0] - 2019-06-19

- compatibility with slate 0.47.3
- updated dependencies

## [0.8.0] - 2018-11-2

- compatibility with slate 0.43.x (thanks @eugene-preply )

### Breaking

- Slate now hoists exported commands and queries to functions callable directly on the Editor instance. So instead of invoking e.g. `plugin.utils.insertTable()` you will now call it directly on your editor, eg. `editor.insertTable()`. See the tests for more examples.
- added `isSelectionInTable()` as an exported query
- renamed some commands for more specificity to ensure they don't collide with other plugins:
  - `moveSelection()` -> `moveTableSelection()`
  - `moveSelectionBy()` -> `moveTableSelectionBy()`
  - `toggleHeaders()` -> `toggleTableHeaders()`

## [0.7.0] - 2018-10-7

- compatibility with slate 0.41.x (thanks @marcjps)

## [0.6.0] - 2017-01-24

- compatibility with slate 0.32.x
- many updates to usage as a result; see the slate changelog, the updated README, and the example

## [0.5.1] - 2017-08-16

- initial working fork of prior project
