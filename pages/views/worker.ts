import * as XLSX from "xlsx";


function compareRows(a, b) {
    if (a["Условные единицы"] > b["Условные единицы"])
        return 1
    else if (a["Условные единицы"] < b["Условные единицы"])
        return -1
    else return 0
}
addEventListener('message', async (event) => {
    const f = event.data.file;
    console.log(f)
    const buffer = await f.arrayBuffer();
    const workbook = await XLSX.read(buffer, {cellDates: true});
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];

    let arr: any[] = XLSX.utils.sheet_to_json(ws);
    for (let i = 0; i < arr.length; i++) {
        arr[i].id = i;
    }
    const sortedRows = [...arr].sort(compareRows);
    const data = {
        rows: arr,
        minRows: sortedRows.slice(0, 5),
        maxRows: sortedRows.slice(arr.length - 5, arr.length),
    };
    postMessage(data);
})