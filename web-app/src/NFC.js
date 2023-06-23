import {useState} from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box'

export default function NFC() {
    const [error, setError] = useState(null);
    const [showProgress, setShowProgress] = useState(false);

    const writeMessage = async () => {
        // eslint-disable-next-line no-undef
        const ndef = new NDEFReader();
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 10000);

        setShowProgress(true);
        try {
            await ndef.write("", {signal: controller.signal});
        } catch (error) {
            switch (error.name) {
                case "NotAllowedError":
                    setError("NFC ist nicht aktiviert!");
                    break;
                case "AbortError":
                    setError("Timeout!");
                    break;
                case "NetworkError":
                case "NotSupportedError":
                case "NotReadableError":
                default:
                    setError("NFC ist nicht verfügbar!");
                    break;
            }
        } finally {
            setShowProgress(false);
        }
    };

    return (
        <>
            <Collapse in={showProgress}>
                <LinearProgress/>
            </Collapse>
            <Collapse in={error !== null}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setError(null);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                    sx={{mb: 2}}
                >
                    {error}
                </Alert>
            </Collapse>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack mt={20} direction="column" alignItems="center" justifyContent="center" sx={{ position: "relative" }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        onClick={writeMessage}
                        disabled={showProgress}
                    >
                        <KeyIcon/>
                    </Fab>
                    {showProgress && (
                        <CircularProgress
                            size={68}
                            sx={{
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Stack>
            </Box>
        </>
    );
}