import {Typography, Button} from "@mui/material";
import theme from "../public/styles/theme";
import text from "../LICENSE.txt"
// @ts-ignore
import {ThemeProvider} from "@mui/material/styles";
import {useCookies} from "react-cookie"
import styles from "../public/styles/index.module.css"


function LicenseScreen(setIsAgree: () => void) {
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
                    <Typography textAlign={"center"} variant={"h4"} color={theme.palette.primary.main} fontWeight={700}>Лицензионное
                        соглашение</Typography>
                    <textarea className={styles.licenseArea + " " + styles.goodScroll} style={{
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
                        <Button onClick={() =>
                            setIsAgree()
                        } variant="contained">Я принимаю</Button>
                        <a href={"/landing"}><Button variant="outlined" style={{marginLeft: 24}}>Лендинг</Button></a>
                    </div>
                </div>

            </div>
        </ThemeProvider>

    </>
}

function AstrologyView() {
    return <></>
}

function MainScreen() {
    const [isAgree, setIsAgree] = useCookies(["agree"])

    function setAgree() {
        setIsAgree("agree", true)
    }

    if (isAgree.agree == null)
        return LicenseScreen(setAgree)
    else
        return AstrologyView()
}

export default MainScreen