import {Box, Typography, Button} from "@mui/material";
// import Button from '@mui/material-next/Button';
import theme from "../public/styles/theme";
import text from "../LICENSE.txt"
// @ts-ignore
import {ThemeProvider} from "@mui/material/styles";


function LicenseScreen() {
    return <>
        <ThemeProvider theme={theme}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%"
            }}>
                <div style={{display: "grid"}}>
                    <Typography textAlign={"center"} variant={"h5"} color={theme.palette.primary.main} fontWeight={700}>Лицензионное
                        соглашение</Typography>
                    <textarea style={{
                        width: "70vw",
                        height: "50vh",
                        resize: "none",
                        marginTop: 48,
                        marginBottom: 48,
                        borderRadius: 8,
                        border: "solid 2px #EADDFF"
                    }} readOnly={true}
                              value={text}/>
                    <div style={{margin: "auto"}}>
                        <Button variant="contained">Я принимаю</Button>
                        <Button variant="outlined" style={{marginLeft: 24}}>Лендинг</Button>
                    </div>
                </div>

            </div>
        </ThemeProvider>

    </>
}

export default LicenseScreen