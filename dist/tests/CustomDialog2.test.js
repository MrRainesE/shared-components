"use strict";

var _react = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
var _CustomDialog = _interopRequireDefault(require("../CustomDialog2"));
var _react2 = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Import the matchers

describe('CustomDialog2', () => {
  it('renders with title, content, and buttons', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_CustomDialog.default, {
      id: "testDialog",
      title: "Test Dialog",
      content: /*#__PURE__*/_react2.default.createElement("div", null, "Test Content"),
      open: true,
      handleClose: handleClose,
      handleSubmit: handleSubmit,
      defaultButtons: [{
        label: 'Close',
        isPrimary: true
      }]
    }));
    expect(_react.screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(_react.screen.getByText('Test Content')).toBeInTheDocument();
    expect(_react.screen.getByText('Close')).toBeInTheDocument();
  });
  it('calls handleClose when close button is clicked', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_CustomDialog.default, {
      id: "testDialog",
      title: "Test Dialog",
      content: /*#__PURE__*/_react2.default.createElement("div", null, "Test Content"),
      open: true,
      handleClose: handleClose,
      handleSubmit: handleSubmit,
      defaultButtons: [{
        label: 'close',
        isPrimary: false
      }, {
        label: 'add',
        isPrimary: true
      }]
    }));
    _react.fireEvent.click(_react.screen.getByText('close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  it('calls handleSubmit when submit button is clicked', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_CustomDialog.default, {
      id: "testDialog",
      title: "Test Dialog",
      content: /*#__PURE__*/_react2.default.createElement("div", null, "Test Content"),
      open: true,
      handleClose: handleClose,
      handleSubmit: handleSubmit,
      defaultButtons: [{
        label: 'submit',
        isPrimary: true
      }]
    }));
    _react.fireEvent.click(_react.screen.getByText('submit'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  it('renders close icon when closeWithIcon is true', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_CustomDialog.default, {
      id: "testDialog",
      title: "Test Dialog",
      content: /*#__PURE__*/_react2.default.createElement("div", null, "Test Content"),
      open: true,
      handleClose: handleClose,
      handleSubmit: handleSubmit,
      defaultButtons: [{
        label: 'close',
        isPrimary: true
      }],
      closeWithIcon: true
    }));
    expect(_react.screen.getByTestId('close-icon')).toBeInTheDocument();
  });
});