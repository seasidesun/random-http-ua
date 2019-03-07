(function(){

/**
 * 随机输出数组内的元素
 * @param {Array || String} list 供随机的数据
 */
const rML = (list) => {
    if (!(list instanceof Array)) return list

    let seed = parseInt(Math.random().toString().slice(-3).split('').reverse().join(''))
    let index = seed % list.length

    return list[index]
}

/**
 * 随机输出区间内的一个数字
 * @param {Number || String} from 最小值
 * @param {Number || String} to 最大值
 */
const rMR = (from, to) => {
    from = parseInt(from)
    to = parseInt(to)

    if (isNaN(from)) return ''
    if (isNaN(to)) to = 0
    if (from === to) return from

    const base = Math.min(from, to)
    const range = Math.abs(from - to) + 1
    let seed = parseInt(Math.random().toString().slice(`-${++range.toString().length}`).split('').reverse().join(''))
    let jump = seed % range

    return base + jump
}

/**
 * 根据所给概率返回此次随机是否落在概率区间
 * @param {Number} rate 概率 1-9
 */
const rMP = (rate) => {
    let seed = parseInt(Math.random().toString().slice(2, 3))
    return seed < rate
}

/**
 * 根据所给概率返回此次随机是否有值
 * @param {Number} rate 概率
 * @param {String} value 有效值
 */
const rMPR = (rate, value) => {
    return rMP(rate) ? value : ''
}

let rD = {
    'device': () => rML(['pc']), // mobile
    'pcOs': () => rML(['windows', 'macos']),
    'mobileOs': () => rML(['android', 'ios']),
    'windowsVer': () => rML(['5.1', '6.1', '10.0']),
    'windowsBit': () => rML(['WOW64', 'Win64; x64']),
    'macosVer': () => rML(['10_13_1', '10_13_2', '10_13_3', '10_13_4', '10_13_5', '10_13_6', '10_14_1', '10_14_2', '10_14_3']),
    'engineVer': () => `${rMR(412, 605)}.${rMR(1, 10)}${rMPR(8, `.${rMR(1, 60)}`)}`,
    'versionVer': () => `${rMR(4, 12)}.${rMR(0, 5)}`,
    'chromeVer': () => `${rMR(50, 73)}.0.${rMR(2500, 3500)}.${rMR(1, 100)}`,
    'safariVer': () => `${rMR(537, 605)}.${rMR(1, 36)}${rMPR(8, `.${rMR(1, 20)}`)}`,
}

let osHandler = {
    'windows': () => {
        return `Windows NT ${rD.windowsVer()}; ${rD.windowsBit()}`
    },
    'macos': () => {
        return `Macintosh; Intel Mac OS X ${rD.macosVer()}`
    },
}

let genOsinfo = (opts) => {
    let ret
    switch (opts.device) {
        case 'pc':
            ret = osHandler[opts.os]()
            break;
        case 'mobile':
            break;
        default:
            break;
    }
    return ret
}


/**
 * 生成一个user-agent
 * @param {Object} opts
 */
let genOneUa = (opts) => {
    // 基金
    let foundation = 'Mozilla/5.0'

    // 系统
    let osInfo = genOsinfo(opts)

    // 引擎
    let engine = `AppleWebKit/${rD.engineVer()} (KHTML\, like Gecko)`

    // 版本号、应用相关信息
    let lstr = `Version/${rD.versionVer()} Chrome/${rD.chromeVer()} Safari/${rD.safariVer()}`

    let ua = `${foundation} (${osInfo}) ${engine} ${lstr}`
    return ua
}

/**
 * 随机生成一个浏览器的系统环境
 * device: pc | mobile
 * os: windows | macos | andriod | ios
 */
let genUaType = () => {
    const device = rD.device()
    const os = rD[`${device}Os`]()

    return {
        device,
        os,
    }
}

let generateUa = (num = 1) => {
    num = parseInt(num)
    if (isNaN(num) || num < 1) num = 1

    let ret = []
    for (let n = 0; n < num; n++) {
        ret.push(genOneUa(genUaType()))
    }

    return ret
}

const randomUa = {
    generateUa,
}

if (typeof exports === 'object') {
    module.exports = randomUa
} else if (typeof define === 'function') {
    define (function () { return randomUa })
} else {
    window.randomUa = randomUa
}
})();