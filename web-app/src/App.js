import {useEffect, useState} from 'react';
import Alert from '@mui/material/Alert';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { ReactComponent as Logo } from './lock.svg';
import NFC from './NFC';

function App() {
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        setAvailable("NDEFReader" in window);
    }, [available]);

    if (!available) {
        return <Alert severity="error">NFC ist nicht verfügbar!</Alert>;
    }

    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <Logo />
                    <Typography variant="h6" color="inherit" sx={{marginLeft: 1}} noWrap>
                        Smart Bicycle Lock
                    </Typography>
                </Toolbar>
            </AppBar>
            <NFC />
        </>
    );
}

export default App;
