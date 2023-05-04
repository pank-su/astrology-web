import {Button, Typography} from "@mui/material";
import theme from "../../public/styles/theme";
import styles from "../../public/styles/index.module.css";
import text from "../../LICENSE.txt";
import React from "react";

interface LicenseProps{
    setIsAgree: () => void
}

function LicenseScreen(props: LicenseProps) {
    return <>
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
                        props.setIsAgree()
                    } variant="contained">Я принимаю</Button>
                    <a href={"/landing"}><Button variant="outlined" style={{marginLeft: 24}}>Лендинг</Button></a>
                </div>
            </div>
        </div>
    </>
}

export default LicenseScreen;