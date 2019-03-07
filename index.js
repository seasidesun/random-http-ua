(function(){

// randomMachine
const rML = (list) => {
    if (!(list instanceof Array)) return list

    let seed = parseInt(Math.random().toString().slice(-3))
    let index = seed % list.length

    return list[index]
}

const rMR = (from, to) => {
    from = parseInt(from)
    to = parseInt(to)

    if (isNaN(from)) return ''
    if (isNaN(to)) to = 0
    if (from === to) return from

    const bottom = from < to ? from : to
    const range = Math.abs(from - to) + 1
    let seed = parseInt(Math.random().toString().slice(-4))
    let index = seed % range

    return bottom + index
}

const rMP = (rate) => {
    let seed = parseInt(Math.random().toString().slice(2, 3))
    return seed < rate
}

const rMPR = (rate, value) => {
    return rMP(rate) ? value : ''
}

let rD = {
    'windowVer': ['5.1', '6.1', '10.0'],
    'windowBit': ['WOW64', 'Win64; x64'],
    'macosVer': ['10_13_1', '10_13_2', '10_13_3', '10_13_4', '10_13_5', '10_13_6', '10_14_1', '10_14_2', '10_14_3'],
    'engineVer': () => `${rMR(412, 605)}.${rMR(1, 10)}${rMPR(8, `.${rMR(1, 60)}`)}`,
    'versionVer': () => `${rMR(4, 12)}.${rMR(0, 5)}`,
    'chromVer': () => `${rMR(50, 73)}.0.${rMR(2500, 3500)}.${rMR(1, 100)}`,
    'safariVer': () => `${rMR(537, 605)}.${rMR(1, 36)}${rMPR(8, `.${rMR(1, 20)}`)}`,
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

    // engine
    let engine = `AppleWebKit/${rD.engineVer()} (KHTML\, like Gecko)`

    return foundation + osInfo + engine
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