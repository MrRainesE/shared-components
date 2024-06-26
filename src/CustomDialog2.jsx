/**
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
import React,{ forwardRef, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Close } from "@mui/icons-material";
import PropTypes from "prop-types";
import {
    useMediaQuery,
    useTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Slide,
    Typography,
    Button,
    IconButton,
    ThemeProvider
} from "@mui/material";
import theme from '../theme'

/**
 * Hook om debounce toe te passen op een waarde.
 * @param {*} value - De waarde om te debounce.
 * @param {number} delay - De vertragingstijd in milliseconden.
 * @returns {*} De gedebounceerde waarde.
 */
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
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
const PaperComponent = (props) => {
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

    return (
        <Draggable
            handle={`#customDialog`}
            cancel={'[class*="MuiDialogContent-root"]'}
            // onDrag={(e) => setY(e.y)}
        >
            <Paper {...props} />
        </Draggable>
    );
};

/**
 * Transitie component voor de dialoog.
 * @param {*} props - De eigenschappen.
 * @param {*} ref - De referentie.
 * @returns {*} De transitie component.
 */
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction={"up"} ref={ref} {...props} />;
});

/**
 * CustomDialog2 component.
 * @param {Object} props - The properties object.
 * @param {boolean} props.fullScreen - Sets the dialog to full screen.
 * @param {Array} props.defaultButtons - An array of default buttons for the dialog.
 * @param {ReactNode} props.extraButton - An additional component to be added in the actions.
 * @param {ReactNode} props.content - The content to be rendered inside the dialog.
 * @param {Object} props.paperProps - Properties for the Paper component.
 * @param {boolean} props.open - Controls whether the dialog is open or closed.
 * @param {function} props.handleClose - Event handler for closing the dialog.
 * @param {function} props.handleSubmit - Event handler for submitting the dialog.
 * @param {boolean} props.closeOnExit - Controls whether the dialog should close on exit.
 * @param {boolean} props.closeWithIcon - Controls whether to show a close icon.
 * @param {string} props.title - The title of the dialog.
 * @param {boolean} props.draggable - Enables dragging functionality for the dialog.
 * @param {boolean} props.animated - Enables slide animation when opening the dialog.
 * @param {string} props.backgroundColor - Background color of the dialog title.
 * @param {string} props.titleColor - Text color of the dialog title.
 * @param {string} props.id - The id of the dialog.
 * @param {string|boolean} props.maxWidth - Maximum width of the dialog.
 * @param {boolean} props.fullWidth - Whether the dialog should be full width.
 * @returns {ReactNode} The CustomDialog2 component.
 */
export default function CustomDialog2({
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
    setOffsetY,
}) {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
   
    return (
        <ThemeProvider theme={theme}>
        <Dialog
            fullScreen={fullScreen}
            id={id}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            aria-labelledby={id}
            TransitionComponent={animated ? Transition : undefined}
            PaperComponent={draggable ? (isSmallScreen ? Paper : PaperComponent) : undefined}
            keepMounted
            open={open}
            onClose={closeOnExit ? handleClose : null}
            PaperProps={draggable ? { style: { ...paperProps }, setOffsetY: setOffsetY } : { style: { ...paperProps } }}
            hideBackdrop={hidebackdrop}
            disableEnforceFocus
        >
            <DialogTitle
                id={'customDialog'}
                style={{
                    backgroundColor: backgroundColor ?? theme.palette.primary.main,
                    color: titleColor ?? "white",
                    cursor: draggable ? "move" : null,
                    zIndex: zIndex ?? 0,
                }}
            >
                {closeWithIcon ? (
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h4">{title}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton
                              data-testid="close-icon" 
                                // tooltipTitle={t("general:dialog.buttons.close")}
                                style={{ color: "white" }}
                                size="small"
                                onClick={() => handleClose()}
                            >
                                <Close id='close-icon'/>
                            </IconButton>
                        </Grid>
                    </Grid>
                ) : (
                    title
                )}
            </DialogTitle>

            <DialogContent dividers style={{ ...contentStyle }}>
                {/* dialog content */}
                {content}
            </DialogContent>
            <DialogActions style={{ ...dialogactionStyle }}>
                {extraButton}
                {defaultButtons
                    // Toon altijd de opslaan/toevoegen knop als eerste.
                    ?.sort((x) => (x ? 1 : -1))
                    ?.map((button) => {
                        return (
                            <Button
                                key={button?.label}
                                disabled={button.disabled}
                                variant={button.isPrimary ? "outlined" : "text"}
                                onClick={(e) => {
                                    button.isPrimary ? handleSubmit() : handleClose();
                                    e.stopPropagation();
                                }}
                                style={{
                                    color: button.disabled ? theme.palette.disabled.main : button.isPrimary ? theme.palette.primary.main : theme.palette.error.main,
                                    borderColor: button.disabled ? theme.palette.disabled.main : button.isPrimary ? theme.palette.primary.main : theme.palette.error.main,
                                }}
                            >
                                {button.label}
                            </Button>
                        );
                    })}
            </DialogActions>
        </Dialog>
        </ThemeProvider>
    );
}

CustomDialog2.propTypes = {
    defaultButtons: PropTypes.array.isRequired,
    extraButton: PropTypes.node,
    content: PropTypes.node.isRequired,
    paperProps: PropTypes.any,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    closeOnExit: PropTypes.bool,
    closeWithIcon: PropTypes.bool,
    title: PropTypes.string.isRequired,
    draggable: PropTypes.bool,
    animated: PropTypes.bool,
    backgroundColor: PropTypes.string,
    titleColor: PropTypes.string,
    id: PropTypes.string.isRequired,
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    fullScreen: PropTypes.bool,
};
