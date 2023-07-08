import {useState} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LegalNoticeAndPrivacyPolicy from "./LegalNoticeAndPrivacyPolicy";

export default function Footer() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">
                    <Link component="button" color="inherit" onClick={handleClickOpen}>
                        Impressum und Datenschutzerklärung
                    </Link>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            Impressum und Datenschutzerklärung
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <LegalNoticeAndPrivacyPolicy/>
                        </DialogContent>
                    </Dialog>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {'Copyright © '}
                    <Link color="inherit" href={window.location.href}>
                        smart-bicycle-lock
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}