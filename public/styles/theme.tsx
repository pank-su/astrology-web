import { Roboto } from "@next/font/google";
// @ts-ignore
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin', "cyrillic", "cyrillic-ext"],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
// @ts-ignore

const theme = createTheme({
    palette: {
        primary: {
            main: '#6750A4',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius: 45,
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 400
                }
            }
        }
    }
});

export default theme;