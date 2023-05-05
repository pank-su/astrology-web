export function dateToString(date: Date): String {
    const yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1).toString(); // Months start at 0!
    let dd = date.getDate().toString();

    if (Number(dd) < 10) dd = '0' + dd;
    if (Number(mm) < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy
}

export function timeToString(date: Date): String {
    let mm = date.getMinutes().toString()
    let hh = date.getHours().toString()
    if (Number(hh) < 10) hh = '0' + hh;
    if (Number(mm) < 10) mm = '0' + mm;
    return hh + '.' + mm
}

