"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CustomDialog2;
var _react = _interopRequireWildcard(require("react"));
var _reactDraggable = _interopRequireDefault(require("react-draggable"));
var _iconsMaterial = require("@mui/icons-material");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _material = require("@mui/material");
var _theme = _interopRequireDefault(require("../theme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /**
 * Dit is de CustomDialog component. Deze component kan overal geïmplementeerd worden en gevuld met een eigen component.
 * Daarnaast zijn er een aantal mogelijkheden om in te stellen:
 * - variant: 'permanent' | 'persistent' | 'temporary'
 * - positie: 'bottom' | 'left' | 'right' | 'top'
 * - kleur: willekeurig string van een kleur
 * - width: '100%' | 'auto' | x aantal pixel
 * - height: '100%' | 'auto' | x aantal pixel
 * - component: een eigen component die gerenderd wordt in de dialog content
 * - open: boolean die aangeeft of de drawer (niet) getoond mag worden
 * - handleClose: event die zorgt ervoor dat de dialoog (niet) getoond wordt
 * - handleSubmit: event die zorgt ervoor dat de submit knop wordt geklikt
 * - paperProps: { height: 100, width: 200 etc }
 * - defaultButtons: [{ label: 'verwijderen', isPrimary: false }] => mag ingevuld worden met meer knoppen
 * - extraButton: extra component die toegevoegd moet worden in de actions
 * - title: titel van de dialoog
 * - titleColor: titel tekst kleur
 * - backgroundColor: achtergrond van de dialoog titel
 * - closeOnExit: bij weg klikken dialoog sluiten
 * - closeWithIcon: sluiten icoon tonen
 * - draggable: maak de dialoog schuifbaar
 * - animated: open de dialoog met een slide animatie
 * - id: id van de dialoog
 * - fullScreen: maak dialog fullscreen. boolean
 */
/**
 * Hook om debounce toe te passen op een waarde.
 * @param {*} value - De waarde om te debounce.
 * @param {number} delay - De vertragingstijd in milliseconden.
 * @returns {*} De gedebounceerde waarde.
 */
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

/**
 * Component voor het Paper element met drag functionaliteit.
 * @param {*} enhancedProps - Versterkte eigenschappen.
 * @returns {*} Het Paper element.
 */
const PaperComponent = props => {
  // const myRef = useRef();
  // const realProps = { ...enhancedProps };
  // delete realProps.setOffsetY;
  // const [y, setY] = useState();
  // const debouncedValue = useDebounce(y, 250);

  // // Zorgt ervoor dat de y wordt bepaald als er wordt gedragged.
  // useEffect(() => {
  //     enhancedProps?.setOffsetY && enhancedProps.setOffsetY(debouncedValue);
  // }, [debouncedValue]);

  // // Zorgt ervoor dat de y wordt bepaald als de dialoog opent.
  // useEffect(() => {
  //     const y = myRef.current?.getBoundingClientRect().y;
  //     if (y) {
  //         setY(y);
  //     }
  // }, [myRef.current?.getBoundingClientRect()]);

  return /*#__PURE__*/_react.default.createElement(_reactDraggable.default, {
    handle: "".concat("#" + props.children[0].props.id),
    cancel: '[class*="MuiDialogContent-root"]',
    onDrag: e => setY(e.y)
  }, /*#__PURE__*/_react.default.createElement(_material.Paper, props));
};

/**
 * Transitie component voor de dialoog.
 * @param {*} props - De eigenschappen.
 * @param {*} ref - De referentie.
 * @returns {*} De transitie component.
 */
const Transition = /*#__PURE__*/(0, _react.forwardRef)(function Transition(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_material.Slide, _extends({
    direction: "up",
    ref: ref
  }, props));
});

/**
 * CustomDialog component.
 * @param {*} props - De eigenschappen.
 * @returns {*} De CustomDialog component.
 */
function CustomDialog2(_ref) {
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
  const isSmallScreen = (0, _material.useMediaQuery)(_theme.default.breakpoints.down('sm'));
  return /*#__PURE__*/_react.default.createElement(_material.ThemeProvider, {
    theme: _theme.default
  }, /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    fullScreen: fullScreen,
    id: id,
    maxWidth: maxWidth,
    fullWidth: fullWidth,
    "aria-labelledby": id,
    TransitionComponent: animated ? Transition : undefined,
    PaperComponent: draggable ? isSmallScreen ? _material.Paper : PaperComponent : undefined,
    keepMounted: true,
    open: open,
    onClose: closeOnExit ? handleClose : null,
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
      backgroundColor: backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : _theme.default.palette.primary.main,
      color: titleColor !== null && titleColor !== void 0 ? titleColor : "white",
      cursor: draggable ? "move" : null,
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
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton
  // tooltipTitle={t("general:dialog.buttons.close")}
  , {
    style: {
      color: "white"
    },
    size: "small",
    onClick: () => handleClose()
  }, /*#__PURE__*/_react.default.createElement(_iconsMaterial.Close, null)))) : title), /*#__PURE__*/_react.default.createElement(_material.DialogContent, {
    dividers: true,
    style: {
      ...contentStyle
    }
  }, content), /*#__PURE__*/_react.default.createElement(_material.DialogActions, {
    style: {
      ...dialogactionStyle
    }
  }, extraButton, defaultButtons
  // Toon altijd de opslaan/toevoegen knop als eerste.
  === null || defaultButtons
  // Toon altijd de opslaan/toevoegen knop als eerste.
  === void 0 || (_defaultButtons$sort = defaultButtons
  // Toon altijd de opslaan/toevoegen knop als eerste.
  .sort(x => x ? 1 : -1)) === null || _defaultButtons$sort === void 0 ? void 0 : _defaultButtons$sort.map(button => {
    return /*#__PURE__*/_react.default.createElement(_material.Button, {
      key: button === null || button === void 0 ? void 0 : button.label,
      disabled: button.disabled,
      variant: button.isPrimary ? "outlined" : "text",
      onClick: e => {
        button.isPrimary ? handleSubmit() : handleClose();
        e.stopPropagation();
      },
      style: {
        color: button.disabled ? _theme.default.palette.disabled.main : button.isPrimary ? _theme.default.palette.primary.main : _theme.default.palette.error.main,
        borderColor: button.disabled ? _theme.default.palette.disabled.main : button.isPrimary ? _theme.default.palette.primary.main : _theme.default.palette.error.main
      }
    }, button.label);
  }))));
}
CustomDialog2.propTypes = {
  defaultButtons: _propTypes.default.array.isRequired,
  extraButton: _propTypes.default.node,
  content: _propTypes.default.node.isRequired,
  paperProps: _propTypes.default.any,
  open: _propTypes.default.bool.isRequired,
  handleClose: _propTypes.default.func.isRequired,
  handleSubmit: _propTypes.default.func.isRequired,
  closeOnExit: _propTypes.default.bool,
  closeWithIcon: _propTypes.default.bool,
  title: _propTypes.default.string.isRequired,
  draggable: _propTypes.default.bool,
  animated: _propTypes.default.bool,
  backgroundColor: _propTypes.default.string,
  titleColor: _propTypes.default.string,
  id: _propTypes.default.string.isRequired,
  maxWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  fullScreen: _propTypes.default.bool
};