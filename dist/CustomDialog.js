"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDraggable = _interopRequireDefault(require("react-draggable"));
var _reactI18next = require("react-i18next");
var _material = require("@mui/material");
var _iconsMaterial = require("@mui/icons-material");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = (0, _react.useState)(value);
  (0, _react.useEffect)(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
const PaperComponent = props => {
  const {
    setOffsetY,
    children,
    ...enhancedProps
  } = props;
  const myRef = (0, _react.useRef)(null);
  const [y, setY] = (0, _react.useState)();
  const debouncedValue = useDebounce(y, 250);
  (0, _react.useEffect)(() => {
    setOffsetY && setOffsetY(debouncedValue);
  }, [debouncedValue, setOffsetY]);
  (0, _react.useEffect)(() => {
    const currentRef = myRef.current;
    if (currentRef) {
      const {
        y
      } = currentRef.getBoundingClientRect();
      setY(y);
    }
  }, [myRef.current]);
  return /*#__PURE__*/_react.default.createElement(_reactDraggable.default, {
    handle: "#".concat(children[0].props.id),
    cancel: "[class*=\"MuiDialogContent-root\"]",
    onDrag: (e, data) => setY(data.y)
  }, /*#__PURE__*/_react.default.createElement(_material.Paper, _extends({
    ref: myRef
  }, enhancedProps)));
};
const Transition = /*#__PURE__*/_react.default.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_material.Slide, _extends({
    direction: "up",
    ref: ref
  }, props));
});
const CustomDialog = _ref => {
  var _defaultButtons$sort;
  let {
    fullScreen,
    defaultButtons,
    extraButton,
    content,
    paperProps,
    open,
    handleClose,
    handleSubmit,
    closeOnExit,
    closeWithIcon,
    title,
    draggable,
    animated,
    backgroundColor,
    titleColor,
    id,
    maxWidth,
    fullWidth,
    hidebackdrop,
    zIndex,
    contentStyle,
    dialogactionStyle,
    setOffsetY
  } = _ref;
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const theme = (0, _material.useTheme)();
  const isSmallScreen = (0, _material.useMediaQuery)(theme.breakpoints.down('sm'));
  const isMediumScreen = (0, _material.useMediaQuery)(theme.breakpoints.between('md', 'lg'));
  const isLargeScreen = (0, _material.useMediaQuery)(theme.breakpoints.up('lg'));
  return /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    fullScreen: fullScreen,
    id: id,
    maxWidth: maxWidth,
    fullWidth: fullWidth,
    "aria-labelledby": id,
    TransitionComponent: animated ? Transition : _material.Fade,
    PaperComponent: draggable ? isSmallScreen ? _material.Paper : PaperComponent : _material.Paper,
    keepMounted: true,
    open: open,
    onClose: closeOnExit ? handleClose : undefined,
    PaperProps: draggable ? {
      style: {
        ...paperProps
      },
      setOffsetY: setOffsetY
    } : {
      style: {
        ...paperProps
      }
    },
    hideBackdrop: hidebackdrop,
    disableEnforceFocus: true
  }, /*#__PURE__*/_react.default.createElement(_material.DialogTitle, {
    id: id,
    style: {
      backgroundColor: backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : theme.palette.primary.main,
      color: titleColor !== null && titleColor !== void 0 ? titleColor : "white",
      cursor: draggable ? "move" : undefined,
      zIndex: zIndex !== null && zIndex !== void 0 ? zIndex : 0
    }
  }, closeWithIcon ? /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, title)), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: t("general:dialog.buttons.close")
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    style: {
      color: "white"
    },
    size: "small",
    onClick: handleClose
  }, /*#__PURE__*/_react.default.createElement(_iconsMaterial.Close, null))))) : title), /*#__PURE__*/_react.default.createElement(_material.DialogContent, {
    dividers: true,
    style: {
      ...contentStyle
    }
  }, content), /*#__PURE__*/_react.default.createElement(_material.DialogActions, {
    style: {
      ...dialogactionStyle
    }
  }, extraButton, defaultButtons === null || defaultButtons === void 0 || (_defaultButtons$sort = defaultButtons.sort(x => x ? 1 : -1)) === null || _defaultButtons$sort === void 0 ? void 0 : _defaultButtons$sort.map((button, index) => /*#__PURE__*/_react.default.createElement(_material.Button, {
    key: index,
    disabled: button.disabled,
    variant: button.isPrimary ? "outlined" : "text",
    onClick: e => {
      button.isPrimary ? handleSubmit() : handleClose();
      e.stopPropagation();
    },
    sx: {
      color: button.disabled ? "lightgrey" : button.isPrimary ? theme.palette.primary.main : theme.palette.error.main,
      borderColor: button.disabled ? 'lightgrey' : button.isPrimary ? theme.palette.primary.main : theme.palette.error.main
    }
  }, button.label))));
};
var _default = exports.default = CustomDialog;