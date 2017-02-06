import moment from 'moment';
import localTime from 'moment-timezone';

function fomate_time (date) {
    const dt = date ? date : new Date().now;
    const time = localTime.tz(moment(dt), "Asia/Shanghai"),
        format_time = localTime.tz(moment(dt), "Asia/Shanghai").format("YYYY-MM-DD"),
        format_time_sec = localTime.tz(moment(dt), "Asia/Shanghai").format("YYYY-MM-DD hh:mm:ss"),
        year = Number(time.format("YYYY")),
        month = Number(time.format("MM")),
        day = Number(time.format("DD"));
    let FullTime = {};
    FullTime.orgin = time;
    FullTime.year = year;
    FullTime.month = month;
    FullTime.day = day;
    FullTime.format_time = format_time;
    FullTime.format_time_sec = format_time_sec;
    return FullTime;
};

export default { fomate_time };
