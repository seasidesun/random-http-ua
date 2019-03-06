(function(){

// randomMachine
const rM = (list) => {
    if (!(list instanceof Array)) return list

    let seed = parseInt(Math.random().toString().slice(-3))
    let index = seed % list.length

    return list[index]
}

let rD = {
    'windowVer': ['5.1', '6.1', '10.0'],
    'windowBit': ['WOW64', 'Win64; x64'],
    'macosVer': ['10_13_6', '10_14_3'],
}

let osHandler = {
    'window': () => {
        return `Windows NT ${rM(rD.windowVer)}; ${rM(rD.windowBit)}`
    },
    'macos': () => {
        return `Macintosh; Intel Mac OS X ${rM(rD.macosVer)}`
    },
}

let createOsinfo = (opts) => {
    let ret
    switch (opts.device) {
        case 'pc':
            ret = osHandler[opts.os]
            break;
        case 'mobile':
            break;
        default:
            break;
    }
    return ret
}


/**
 * 生成userAgent
 * @param {Object} opts
 * device: pc | mobile
 * os: windows | macos | ios | android
 */
let createOneUa = (opts) => {
    // 基金会
    let foundation = 'Mozilla/5.0'

    // 系统相关
    let osInfo = createOsinfo(opts)

    return foundation + osInfo
}

let createUas = (num = 1, opts) => {
    num = parseInt(num)
    if (!isNaN(num) || num < 1) return createOneUa(opts)

    let ret = []
    for (let n = 0; n < num; n++) {
        ret.push(createOneUa(opts))
    }

    return ret
}

const randomUa = {
    createUas,
}

if (typeof exports === 'object') {
    module.exports = randomUa
} else if (typeof define === 'function') {
    define (function () {
        return randomUa
    })
} else {
    window.randomUa = randomUa
}
})();