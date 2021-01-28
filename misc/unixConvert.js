function unixConvert(timestamp) {
    const time = new Date(timestamp);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    let date = time.getDate(),
    hour = time.getHours(),
    min = time.getMinutes();    
    hour < 10 ? hour = `0${hour}` : null
    min < 10 ? min = `0${min}` : null
    date == (new Date()).getDate() ? date = "Today" : date = date
    date == (new Date(Date.now() + (1 * 1000 * 60 * 60 * 24))).getDate() ? date = "Tomorrow" : date = date
    date == (new Date(Date.now() - (1 * 1000 * 60 * 60 * 24))).getDate() ? date = "Today" : date = date
    if (timestamp > (Date.now() + 1 * 5 * 1000 * 60 * 60 * 24)) return "The future"

    return date == "Today" ? `${date} at ${hour}:${min} ${require("moment")(timestamp).format("A")}` : date == "Tomorrow" ? `${date} at ${hour}:${min} ${require("moment")(timestamp).format("A")}` : `${date}/${month}/${year}`;
}

module.exports = unixConvert
