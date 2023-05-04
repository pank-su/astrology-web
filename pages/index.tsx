import theme from "../public/styles/theme";

// @ts-ignore
import {ThemeProvider} from "@mui/material/styles";
// import {useCookies} from "react-cookie"
import React, {lazy, Suspense, useState} from "react";
// import LicenseScreen from "./views/LicenseScreen";
// import AstrologyView from "./views/AstrologyView";

const LicenseScreen = lazy(() => {
    // @ts-ignore
    return import("./views/LicenseScreen");
})

const AstrologyView = lazy(() => {
    // @ts-ignore
    return import("./views/AstrologyView");
})

function MainScreen() {
    const [isAgree, setIsAgree] = useState(false)

    function setAgree() {
        setIsAgree(true)
    }

    console.log(isAgree)

    if (!isAgree)
        return <>
            <ThemeProvider theme={theme}>
                <Suspense fallback={<p>Загрузка</p>}>
                    <LicenseScreen setIsAgree={setAgree}/>
                </Suspense>
            </ThemeProvider>
        </>
    else
        return <>
            <ThemeProvider theme={theme}>
                <Suspense fallback={<p>Загрузка</p>}>
                    <AstrologyView/>
                </Suspense>
            </ThemeProvider>
        </>
}

export default MainScreen