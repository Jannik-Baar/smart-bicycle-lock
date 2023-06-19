import {useState} from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
            await ndef.write("Hello world!", {signal: controller.signal});
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
            <Stack mt={5} direction="column" alignItems="center" justifyContent="center">
                <Button variant="contained" onClick={() => writeMessage()} disabled={showProgress}>(un)lock</Button>
            </Stack>
        </>
    );

}