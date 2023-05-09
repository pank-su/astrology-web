import React, {lazy, SyntheticEvent, useState, Suspense} from "react";
import {Box, Button, Paper, Typography, Backdrop, CircularProgress} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import theme from "../../public/styles/theme";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import styles from "../../public/styles/index.module.css";
import {InfoOutlined} from "@mui/icons-material";
import * as XLSX from 'xlsx/xlsx.mjs';
import {DatePicker, TimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";


const MinMax = lazy(() => import("./MinMax"))

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

function compasreRows(a, b) {
    if (a["Условные единицы"] > b["Условные единицы"])
        return 1
    else if (a["Условные единицы"] < b["Условные единицы"])
        return -1
    else return 0
}


function AstrologyView() {


    let defaultInfoText = `Расчет совместимости партнёров для:
`
    const [value, setValue] = useState(0);

    const [rows, setRows] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState(new Date())
    const [filteredRows, setFilteredRows] = useState([])
    const [minRows, setMinRows] = useState([])
    const [maxRows, setMaxRows] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const clearFilter = function () {
        setFilteredRows(rows)
    }


    const setFilter = function () {
        let goodRows = []
        for (let i = 0; i < 2; i++) {
            let row = rows[i];
            if (dateToString(row["Дата"]) == dateToString(selectedDate) && timeToString(row["Время"]) == timeToString(selectedTime)) {
                goodRows.push(row)
            }
        }
        setFilteredRows(goodRows)
    }


    if (rows.length > 0) {
        try {
            defaultInfoText += rows[0]["ФИО"] + ", " + dateToString(rows[0]["Дата Рождения"])
        } catch (e) {
            console.log("Фамилии")
        }
    } else {
        defaultInfoText = "Пожалуйста введите файл."
    }
    const handleFile = async event => {
        if (event.target.files && event.target.files[0]) {
            setIsLoading(true)
            const f: File = event.target.files[0];
            let buffer = await f.arrayBuffer()
            const workbook = await XLSX.read(buffer, {cellDates: true})
            const wsname = workbook.SheetNames[0];
            const ws = workbook.Sheets[wsname];
            let arr: any[] = await XLSX.utils.sheet_to_json(ws)
            for (let i = 0; i < arr.length; i++) {
                arr[i].id = i
            }
            setRows(arr)
            setFilteredRows(arr)
            let newArr = [...arr]
            newArr.sort(compasreRows)
            setMinRows(newArr.slice(0, 5))
            setMaxRows(newArr.slice(newArr.length - 5, newArr.length ))
            setIsLoading(false)
        }
    }

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // @ts-ignore
    //[{id: 0, Дата: "test", Время: "test", Условные_единицы: "test"}]

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
    // @ts-ignore
    return <>
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%"
        }}><Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
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

                            <Button style={{height: "70%"}} onClick={() => clearFilter()}
                                    variant={"contained"}>Сбросить</Button>}
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
                        <div>
                            <Paper style={{borderRadius: 8}} elevation={3}>
                                <DataGrid rows={filteredRows} style={{height: "40vh"}} columns={columns}/>
                            </Paper>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 48,
                                marginTop: 34
                            }}>
                                <div style={{backgroundColor: "#FFFFFF", borderRadius: 4}}>
                                    <DatePicker onChange={date => {
                                        // @ts-ignore
                                        setSelectedDate(dayjs(date).toDate())
                                    }} label="Выбирете дату"/>
                                </div>

                                <div style={{backgroundColor: "#FFFFFF", borderRadius: 4}}>
                                    <TimePicker onChange={date => {
                                        // @ts-ignore
                                        setSelectedTime(dayjs(date).toDate())
                                    }}
                                                timeSteps={{hours: 1, minutes: 60}} label="Выбирете время"/>
                                </div>
                                <Button onClick={() => setFilter()}
                                        variant={"contained"}>Рассчитать</Button>
                            </div>
                        </div>
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {rows.length != 0 &&
                        <Suspense fallback={<div>Loading...</div>}>
                            <MinMax columns={columns} minRows={minRows} maxRows={maxRows}/>
                        </Suspense>
                    }
                </TabPanel>

            </div>
        </div>
    </>
}

export default AstrologyView;