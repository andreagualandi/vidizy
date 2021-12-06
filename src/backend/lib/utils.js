"use strict";

function hmsToSeconds(h, m, s) {
    return (+h) * 60 * 60 + (+m) * 60 + (+s);
}

function strToSeconds(string) {
    if (!string) {
        return 0;
    }
    const time = string.match(/(\d{2}):(\d{2}):(\d{2})/);
    return hmsToSeconds(time[1], time[2], time[3]);
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

module.exports = { hmsToSeconds, strToSeconds, roundToTwo };