import {Paper, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import React from "react";

interface MinMaxProps{
    columns: any[];
    minRows: any[];
    maxRows: any[];
}

export default function MinMax(props: MinMaxProps) {
    return <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }}>
        <Typography variant={"h6"}>Наибольшие показатели</Typography>
        <Paper style={{borderRadius: 8}} elevation={3}>
            <DataGrid style={{height: "40vh", width: "100%"}} initialState={{
                sorting: {
                    sortModel: [{field: 'Условные единицы', sort: 'desc'}],
                },
            }} columns={props.columns} rows={props.maxRows}/>
        </Paper>
        <Typography variant={"h6"}>Наименьшие показатели</Typography>
        <Paper style={{borderRadius: 8}} elevation={3}>
            <DataGrid style={{height: "40vh"}} initialState={{
                sorting: {
                    sortModel: [{field: 'Условные единицы', sort: 'asc'}],
                },
            }} columns={props.columns} rows={props.minRows}/>
        </Paper>
    </div>
}