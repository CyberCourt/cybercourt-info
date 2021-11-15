

function formatDate(str) {
    return str; //`${str.substr(0, 4)}/${str.substr(4, 2)}/${str.substr(6, 2)}`
}

function shortAddr(addr) {
    return addr.substr(0, 6) + '...' + addr.substr(-4)
}

function contractResult(succ, msg) {
    return {succ: succ, ...msg};
}
function formatSeconds(value) {
    var theTime = parseInt(value);
    var theTime1 = 0;
    var theTime2 = 0;
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }

    var result = "" + parseInt(theTime);
        result = "" + parseInt(theTime)+"s";

        result = "" + parseInt(theTime1) + "m" + result;
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "h" + result;
    }
    return result;
}
function getTimeStringByBlockTime(blockTime){
    var blockDate = new Date(parseInt(blockTime) * 1000);
    return blockDate.toLocaleString();
}
export default {
    formatDate,
    shortAddr,
    contractResult,
    formatSeconds,
    getTimeStringByBlockTime
}