"use strict";

function hmsToSeconds(h, m, s) {
    return (+h) * 60 * 60 + (+m) * 60 + (+s);
}

module.exports = { hmsToSeconds };