import {Typography, Button, Box} from "@mui/material";
import theme from "../public/styles/theme";
import text from "../LICENSE.txt"
// @ts-ignore
import {ThemeProvider} from "@mui/material/styles";
import {useCookies} from "react-cookie"
import styles from "../public/styles/index.module.css"
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, {SyntheticEvent, useState} from "react";
import Grid from '@mui/material/Grid';
import {InfoOutlined} from "@mui/icons-material";


const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
];

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}



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
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return <>
        <ThemeProvider theme={theme}>

            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%"
            }}>
                <div style={{display: "grid", width: "81%"}}>
                    <Typography textAlign={"center"}  fontWeight={700} color={theme.palette.primary.main} variant={"h4"}>Точка
                        опоры. В
                        личном</Typography>
                    <Tabs style={{marginTop: 60}} variant={"fullWidth"} value={value} onChange={handleChange}>
                        <Tab label={"Поиск"} value={0}/>
                        <Tab label={"Мин/макс"} value={1}/>
                    </Tabs>
                    <Grid container style={{
                        width: "90%",
                        margin: "32px 5%",
                        background: '#EADDFF',
                        paddingTop: 12,
                        paddingBottom: 12,
                        paddingRight: 24,
                        borderRadius: 15
                    }}>
                        <Grid xs={1} className={styles.centeredHeight}>
                            <InfoOutlined color={"primary"}/>
                        </Grid>
                        <Grid xs={7}>
                            <Typography color={"#21005D"} variant={"body1"}>Расчет совместимости партнёров для:<br/>Гамуйло
                                Сергей Сергеевич, 29.12.2004 </Typography>
                        </Grid>
                        <Grid xs={4} className={styles.centeredHeight}>
                            <Button style={{height: "70%"}} variant={"contained"}>Сбросить</Button>
                            <Button style={{height: "70%", marginLeft: 16}} variant={"outlined"}>Инструкция</Button>
                        </Grid>
                    </Grid>
                    <TabPanel value={value} index={0}>
                        <DataGrid rows={rows} columns={columns}  />
                    </TabPanel>
                </div>
            </div>
        </ThemeProvider></>
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