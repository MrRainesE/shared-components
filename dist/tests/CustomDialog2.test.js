"use strict";

var _react = require("@testing-library/react");
var _CustomDialog = _interopRequireDefault(require("../CustomDialog2"));
var _react2 = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('CustomDialog2', () => {
  it('renders with title and content', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    const {
      getByText
    } = (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_CustomDialog.default, {
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
    expect(getByText('Test Dialog')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });
  it('calls handleClose when close button is clicked', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    const {
      getByText
    } = (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_CustomDialog.default, {
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
    _react.fireEvent.click(getByText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  it('calls handleSubmit when submit button is clicked', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    const {
      getByText
    } = (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_CustomDialog.default, {
      id: "testDialog",
      title: "Test Dialog",
      content: /*#__PURE__*/_react2.default.createElement("div", null, "Test Content"),
      open: true,
      handleClose: handleClose,
      handleSubmit: handleSubmit,
      defaultButtons: [{
        label: 'Submit',
        isPrimary: true
      }]
    }));
    _react.fireEvent.click(getByText('Submit'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  it('does not call handleClose when close button is clicked if closeOnExit is false', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    const {
      getByText
    } = (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_CustomDialog.default, {
      id: "testDialog",
      title: "Test Dialog",
      content: /*#__PURE__*/_react2.default.createElement("div", null, "Test Content"),
      open: true,
      handleClose: handleClose,
      handleSubmit: handleSubmit,
      defaultButtons: [{
        label: 'Close',
        isPrimary: true
      }],
      closeOnExit: false
    }));
    _react.fireEvent.click(getByText('Close'));
    expect(handleClose).not.toHaveBeenCalled();
  });
  it('renders close icon when closeWithIcon is true', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    const {
      getByTestId
    } = (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_CustomDialog.default, {
      id: "testDialog",
      title: "Test Dialog",
      content: /*#__PURE__*/_react2.default.createElement("div", null, "Test Content"),
      open: true,
      handleClose: handleClose,
      handleSubmit: handleSubmit,
      defaultButtons: [{
        label: 'Close',
        isPrimary: true
      }],
      closeWithIcon: true
    }));
    expect(getByTestId('close-icon')).toBeInTheDocument();
  });
});