import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2aa461',
        },
        secondary: {
            main: '#297dcf',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#353535',
        },
    },
});

export default theme;