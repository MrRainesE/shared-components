/**
 * CustomDialog component.
 * @module CustomDialog
 */

import React, { MouseEvent, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Fade, 
    Grid, 
    IconButton, 
    Paper, 
    Slide, 
    Tooltip, 
    Typography, 
    useMediaQuery, 
    useTheme, 
    Breakpoint 
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { TransitionProps } from '@mui/material/transitions';

interface CustomDialogProps {
    fullScreen?: boolean;
    defaultButtons: { label: string; disabled?: boolean; isPrimary?: boolean }[];
    extraButton?: React.ReactNode;
    content: React.ReactNode;
    paperProps?: any;
    open: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
    closeOnExit?: boolean;
    closeWithIcon?: boolean;
    title: string;
    draggable?: boolean;
    animated?: boolean;
    backgroundColor?: string;
    titleColor?: string;
    id: string;
    maxWidth?: false | Breakpoint;
    fullWidth?: boolean;
    hidebackdrop?: boolean;
    zIndex?: number;
    contentStyle?: React.CSSProperties;
    dialogactionStyle?: React.CSSProperties;
    setOffsetY?: (value: number) => void;
}

const useDebounce = <T extends unknown>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

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

const PaperComponent: React.FC<any> = (props) => {
    const { setOffsetY, children, ...enhancedProps } = props;
    const myRef = useRef<HTMLElement | null>(null);
    const [y, setY] = useState<number | undefined>();
    const debouncedValue = useDebounce(y, 250);

    useEffect(() => {
        setOffsetY && setOffsetY(debouncedValue);
    }, [debouncedValue, setOffsetY]);

    useEffect(() => {
        const currentRef = myRef.current;
        if (currentRef) {
            const { y } = currentRef.getBoundingClientRect();
            setY(y);
        }
    }, [myRef.current]);

    return (
        <Draggable handle={`#${children[0].props.id}`} cancel={`[class*="MuiDialogContent-root"]`} onDrag={(e, data) => setY(data.y)}>
            <Paper ref={myRef} {...enhancedProps} />
        </Draggable>
    );
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

/**
 * Props for CustomDialog component.
 * @typedef {Object} CustomDialogProps
 * @property {boolean} [fullScreen] - Indicates whether the dialog should be displayed in full screen.
 * @property {boolean} [defaultButtons] - Default buttons to be displayed in the dialog.
 * @property {React.ReactNode} [extraButton] - Additional button to be displayed in the dialog.
 * @property {React.ReactNode} [content] - Content of the dialog.
 * @property {object} [paperProps] - Props applied to the Paper component.
 * @property {boolean} open - Indicates whether the dialog is open.
 * @property {Function} handleClose - Callback function to handle dialog closing.
 * @property {Function} handleSubmit - Callback function to handle form submission.
 * @property {boolean} [closeOnExit] - Indicates whether the dialog should be closed on exit.
 * @property {boolean} [closeWithIcon] - Indicates whether to display close icon.
 * @property {string} [title] - Title of the dialog.
 * @property {boolean} [draggable] - Indicates whether the dialog should be draggable.
 * @property {boolean} [animated] - Indicates whether the dialog should be animated.
 * @property {string} [backgroundColor] - Background color of the dialog title.
 * @property {string} [titleColor] - Color of the dialog title text.
 * @property {string} [id] - Id of the dialog.
 * @property {number} [maxWidth] - Maximum width of the dialog.
 * @property {boolean} [fullWidth] - Indicates whether the dialog should be full width.
 * @property {boolean} [hidebackdrop] - Indicates whether to hide the backdrop.
 * @property {number} [zIndex] - Z-index of the dialog.
 * @property {object} [contentStyle] - Style applied to the dialog content.
 * @property {object} [dialogactionStyle] - Style applied to the dialog actions.
 * @property {Function} [setOffsetY] - Callback function to set Y offset.
 */

/**
 * CustomDialog component.
 * @param {CustomDialogProps} props - Component props.
 * @returns {JSX.Element} - Rendered component.
 */  
const CustomDialog: React.FC<CustomDialogProps> = ({
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
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Dialog
            fullScreen={fullScreen}
            id={id}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            aria-labelledby={id}
            TransitionComponent={animated ? Transition : Fade}
            PaperComponent={draggable ? (isSmallScreen ? Paper : PaperComponent) : Paper}
            keepMounted
            open={open}
            onClose={closeOnExit ? handleClose : undefined}
            PaperProps={draggable ? { style: { ...paperProps }, setOffsetY: setOffsetY } : { style: { ...paperProps } }}
            hideBackdrop={hidebackdrop}
            disableEnforceFocus
        >
            <DialogTitle
                id={id}
                style={{
                    backgroundColor: backgroundColor ?? theme.palette.primary.main,
                    color: titleColor ?? "white",
                    cursor: draggable ? "move" : undefined,
                    zIndex: zIndex ?? 0,
                }}
            >
                {closeWithIcon ? (
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h4">{title}</Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title={"close"}>
                                <IconButton style={{ color: "white" }} size="small" onClick={handleClose}>
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                ) : (
                    title
                )}
            </DialogTitle>

            <DialogContent dividers style={{ ...contentStyle }}>
                {content}
            </DialogContent>
            <DialogActions style={{ ...dialogactionStyle }}>
                {extraButton}
                {defaultButtons
                    ?.sort((x) => (x ? 1 : -1))
                    ?.map((button, index) => (
                        <Button
                            key={index}
                            disabled={button.disabled}
                            variant={button.isPrimary ? "outlined" : "text"}
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                button.isPrimary ? handleSubmit() : handleClose();
                                e.stopPropagation();
                            }}
                            sx={{
                                color: button.disabled ? "lightgrey" : button.isPrimary ? theme.palette.primary.main : theme.palette.error.main,
                                borderColor: button.disabled ? 'lightgrey' : button.isPrimary ? theme.palette.primary.main : theme.palette.error.main,
                            }}
                        >
                            {button.label}
                        </Button>
                    ))}
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
