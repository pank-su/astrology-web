import React, {SyntheticEvent, useState} from "react";
import {Box, Button, Paper, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import theme from "../../public/styles/theme";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import styles from "../../public/styles/index.module.css";
import {InfoOutlined} from "@mui/icons-material";
import * as XLSX from 'xlsx/xlsx.mjs';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}


function dateToString(date: Date): String {
    const yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1).toString(); // Months start at 0!
    let dd = date.getDate().toString();

    if (Number(dd) < 10) dd = '0' + dd;
    if (Number(mm) < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy
}

function timeToString(date: Date): String {
    let mm = date.getMinutes().toString()
    let hh = date.getHours().toString()
    if (Number(hh) < 10) hh = '0' + hh;
    if (Number(mm) < 10) mm = '0' + mm;
    return hh + '.' + mm
}

function AstrologyView() {
    let defaultInfoText = `Расчет совместимости партнёров для:
`
    const [value, setValue] = useState(0);
    const [rows, setRows] = useState([])
    if (rows.length > 0) {
        defaultInfoText += rows[0].ФИО + ", " + dateToString(rows[0]["Дата Рождения"])

    }

    const handleFile = event => {
        if (event.target.files && event.target.files[0]) {
            const f: File = event.target.files[0];
            console.log(f)
            f.arrayBuffer().then((value) => {
                const workbook = XLSX.read(value, {cellDates: true})
                const wsname = workbook.SheetNames[0];
                const ws = workbook.Sheets[wsname];
                let arr: any[] = XLSX.utils.sheet_to_json(ws)

                for (let i = 0; i < arr.length; i++) {
                    arr[i].id = i
                }
                console.log(arr)
                setRows(arr)
            })
        }
    }

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // @ts-ignore
    //[{id: 0, Дата: "test", Время: "test", Условные_единицы: "test"}]
    if (rows.length == 0) {
        defaultInfoText = "Пожалуйста введите файл."
    }
    let columns: GridColDef[] = [
        {
            field: 'Дата', headerName: 'Дата',
            minWidth: 120, flex: 0.3,
            renderCell: (params: GridRenderCellParams<Date>) => (dateToString(params.value))
        },
        {
            field: 'Время', headerName: 'Время',
            minWidth: 150, flex: 0.7,
            renderCell: (params: GridRenderCellParams<Date>) => (timeToString(params.value))
        },
        {field: 'Условные единицы', headerName: 'Условные единицы', minWidth: 150, flex: 0.1},
    ]
    return <>
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%"
        }}>
            <div style={{display: "grid", width: "81%"}}>
                <Typography textAlign={"center"} fontWeight={700} color={theme.palette.primary.main} variant={"h4"}>Точка
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
                    <Grid xs={1} item className={styles.centeredHeight}>
                        <InfoOutlined color={"primary"}/>
                    </Grid>
                    {rows.length == 0 &&
                        <Grid xs={7} item className={styles.centeredHeight}>
                            <Typography style={{whiteSpace: "pre-line"}} color={"#21005D"}
                                        variant={"body1"}>{defaultInfoText}</Typography>
                        </Grid>
                    }
                    {rows.length != 0 &&
                        <Grid xs={7} item>
                            <Typography style={{whiteSpace: "pre-line"}} color={"#21005D"}
                                        variant={"body1"}>{defaultInfoText}</Typography>
                        </Grid>
                    }
                    <Grid xs={4} item className={styles.centeredHeight}>
                        {rows.length != 0 &&

                            <Button style={{height: "70%"}} variant={"contained"}>Сбросить</Button>}
                        {rows.length != 0 &&
                            <Button style={{height: "70%", marginLeft: 16}}
                                    variant={"outlined"}>Инструкция</Button>
                        }
                        {rows.length == 0 &&
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Выбрать файл
                                <input
                                    type="file"
                                    accept={".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}
                                    onChange={handleFile}
                                    hidden
                                />
                            </Button>
                        }
                    </Grid>

                </Grid>
                <TabPanel value={value} index={0}>
                    {rows.length != 0 &&
                        <Paper style={{borderRadius: 8}} elevation={3}>
                            <DataGrid rows={rows} style={{height: "40vh"}} columns={columns}/>
                        </Paper>
                    }

                </TabPanel>
            </div>
        </div>
    </>
}

export default AstrologyView;