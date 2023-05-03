import {Roboto} from "@next/font/google";
// @ts-ignore
import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

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
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 45,
                        boxShadow: 'none',
                        textTransform: 'none',
                        fontWeight: 400
                    }
                }
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        "&.Mui-selected": {
                            backgroundColor: '#E8DEF8',
                        }
                    },
                }
            },
            MuiTabs:{
                styleOverrides:{
                    root:{
                        border: "solid 1px #6750A4",

                        borderRadius: 10,
                        backgroundColor: "#FFFBFE",

                    }
                }
            },
            MuiDataGrid:{
                styleOverrides:{
                    root:{
                        backgroundColor: "#FFFFFF",
                        border: "solid 1px #6750A4",
                        borderRadius: 8
                    }
                }
            }

        }
    })
;

export default theme;