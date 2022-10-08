const pathTos = ''
const hospitalId = ''
const departmentId = ''
const tokenId = ''
const token = function() {
    console.log(getAdmin2(cookies, ' tokenId'))
    tokenId = getAdmin2(cookies, 'tokenId')
}

/**
 * 获取当前时间
 *  @param _type 类型
 *       0 - 小时
 *       1 - 分钟
 *       2 早中晚（0-上午，1-下午, 2- 晚上）
 *       3 - 格式化当前日期 年月日
 *       4 - 格式化日期 月日
 *       5 - 日期 星期
 *       6 - 未来一周
 *       7 - 当前时间字符串 无分割符
 *       8 - 当前一周
 * @param _days 增加或减少天数
 * @param _sign 分割符号
 */
export const GetCurrentTime = (_type, _days, _sign) => {
    console.log(_type)
    _type = !_type ? 0 : _type;
    _days = !_days ? 0 : _days;
    _sign = !_sign ? '-' : _sign;
    var date = new Date(),
        Result;
    var today = date.getTime();
    var timestamp = today + _days * 24 * 60 * 60 * 1000;
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var days = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    month = month < 10 ? '0' + month : month;
    days = days < 10 ? '0' + days : days;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    switch (_type) {
        case 0:
            Result = hours;
            break;
        case 1:
            Result = minutes;
            break;
        case 2:
            Result = 0;
            if (hours > 11 && hours <= 17) Result = 1;
            else if (hours > 17) Result = 2;
            break;
        case 3:
            Result = year + _sign + month + _sign + days;
            break;
        case 4:
            Result = GetCurrentTime(3, _days, _sign).substring(5);
            break;
        case 5:

            var weekArr = ['\u661f\u671f\u5929', '\u661f\u671f\u4e00', '\u661f\u671f\u4e8c', '\u661f\u671f\u4e09', '\u661f\u671f\u56db', '\u661f\u671f\u4e94', '\u661f\u671f\u516d'];
            var weekName = weekArr[time.getDay()];
            Result = {
                day: days,
                month: month + _sign + days,
                date: year + _sign + month + _sign + days,
                week: weekName
            }
            break;
        case 6:
            Result = [
                GetCurrentTime(5, 1, _sign), GetCurrentTime(5, 2, _sign), GetCurrentTime(5, 3, _sign), GetCurrentTime(5, 4, _sign), GetCurrentTime(5, 5, _sign), GetCurrentTime(5, 6, _sign), GetCurrentTime(5, 7, _sign)
            ];
            break;
        case 7:
            Result = '' + year + month + days + hours + minutes + seconds;
            break;

        case 8:
            Result = [
                GetCurrentTime(5, 0, _sign), GetCurrentTime(5, 1, _sign), GetCurrentTime(5, 2, _sign), GetCurrentTime(5, 3, _sign), GetCurrentTime(5, 4, _sign), GetCurrentTime(5, 5, _sign), GetCurrentTime(5, 6, _sign)
            ];
            break;

        case 9:
            Result = year + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
            break;

    }
    return Result;
}