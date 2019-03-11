(function(){
/**
 * 根据所给概率返回此次随机是否落在概率区间
 * @param {Number} rate 概率 0-10
 */
const rMP = (rate) => {
    let seed = parseInt(Math.random().toString().slice(2, 4))
    return seed < rate
}

/**
 * 根据所给概率返回此次随机是否有值
 * @param {String} data 概率^有效值
 */
const rMPR = (data) => {
    data = data.split('^')
    if (!data[1]) return data[0]
    return rMP(data[0]) ? data[1] : ''
}

/**
 * 随机输出数组内的元素
 * @param {Array || String} list 供随机的数据
 */
const rML = (list) => {
    if (!(list instanceof Array)) list = [list]

    let listNoRate = []
    let listWithRate = []
    list.forEach((data) => {
        if (data.includes('^')) listWithRate.push(data)
        else listNoRate.push(data)
    })

    if (listWithRate.length) {
        let rateResult = null
        for (let n = 0; n < listWithRate.length; n++) {
            let curRandomValue = rMPR(listWithRate[n])
            if (curRandomValue) {
                rateResult = curRandomValue
                break;
            }
        }
        if (rateResult) return rateResult
    }

    if (!listNoRate.length) listNoRate = listWithRate

    let seed = parseInt(Math.random().toString().slice(-3).split('').reverse().join(''))
    let index = seed % listNoRate.length

    return listNoRate[index].replace(/^[0-9]{1,3}\^/, '')
}

/**
 * 随机26字母
 * @param {Number} num 字母的长度
 */
const rMW = (num = 1) => {
    let ret = ''
    for (let n = 0; n < num; n++) {
        ret += rML(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'])
    }
    return ret
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
 * 将数组里的元素拼成一个字符串，'' | ';'过滤
 * @param {Array || String} list
 */
const concatlList = (list) => {
    if (!(list instanceof Array)) list = [list]
    return list.filter((item) => {return !(['', ';'].includes(item))}).join(' ')
}

/**
 * 供随机的数据
 */
const rD = {
    'device': () => rML(['mobile']), // pc

    'pcOs': () => rML(['windows', 'macos']),
    'mobileOs': () => rML(['android']), // ios

    'windowsVer': () => rML(['5.1', '6.1', '10.0']),
    'windowsBit': () => rML(['WOW64', 'Win64; x64']),
    'windowsApp': () => rML(['ie', 'edge', 'qb', 'chrome', 'firfox', '360']),

    'macosVer': () => rML(['10_13_1', '10_13_2', '10_13_3', '10_13_4', '10_13_5', '10_13_6', '10_14_1', '10_14_2', '10_14_3']),
    'macosApp': () => rML(['safari', 'chrome', 'firfox']),

    'iosVer': () => rML([`10_${rMR(1, 2)}`, `11_${rMR(1, 4)}_${rMR(1, 4)}`, `12_${rMR(1, 2)}_${rMR(1, 4)}`]),
    'iosApp': () => rML(['safari', 'qb', 'wechat']),

    'androidVer': () => `${rMR(7, 9)}.${rMR(0, 5)}${rMPR(`80^.${rMR(0, 5)}`)}`,
    'androidDevice': () => rML(['mi']),
    // 'androidDevice': () => rML(['huawei', 'mi', 'vivo', 'oppo', 'samsung']),
    'androidApp': () => rML(['wechat']),

    'engineVer': () => `${rMR(412, 605)}.${rMR(1, 10)}${rMPR(`80^.${rMR(1, 60)}`)}`,
    'versionVer': () => `${rMR(4, 12)}.${rMR(0, 5)}`,
    'chromeVer': () => `${rMR(50, 73)}.0.${rMR(2500, 3500)}.${rMR(1, 100)}`,
    'safariVer': () => `${rMR(537, 605)}.${rMR(1, 36)}${rMPR(`80^.${rMR(1, 20)}`)}`,
    'mobileVer': () => `${rMR(11, 14)}${rMW()}${rMR(1, 60)}${rMR(1, 60)}${rMPR(`80^${rMW()}`)}`,
    'networwVer': () => rML(['5^3G', '4G', 'WIFI']),

    'netVer': () => `${rMR(2, 4)}.${rMR(0, 5)}${rMPR(`80^.${rMR(30729, 50727)}`)}`,
    'ieVer': () => rML(['8.0', '9.0', '10.0']),
    'tridentVer': () => rML(['4.0', '5.0', '6.0']),
    'qbVer': () => `${rMR(8, 10)}.${rMR(0, 5)}.${rMR(2500, 3200)}.${rML(['100', '200', '300', '400'])}`,
    'qbcoreVer': () => `${rMR(1, 3)}.${rMR(50, 75)}.${rMR(500, 3500)}.${rML(['100', '200', '300', '400'])}`,
    'edgeVer': () => `${rMR(11, 17)}.${rMR(11000, 17000)}`,
    'firefoxVer': () => `${rMR(55, 65)}.${rMR(0, 10)}`,
}

/**
 * ua系统信息
 */
const osHandlerOfpc = {
    'windows': () => {
        return `Windows NT ${rD.windowsVer()}; ${rD.windowsBit()}`
    },
    'windows-ie': () => {
        return concatlList([
            `compatible; MSIE ${rD.ieVer()};`,
            `Windows NT ${rD.windowsVer()};`, 
            `${rMPR(`50^${rD.windowsBit()}`)};`,
            `Trident/${rD.tridentVer()};`,
            `${rMPR(`50^SLCC2`)};`,
            `${rMPR(`50^${`.NET CLR ${rD.netVer()}`}`)};`,
            `${rMPR(`50^Tablet PC 2.0`)};`,
        ])
    },
    'macos': () => {
        return `Macintosh; Intel Mac OS X ${rD.macosVer()}`
    },
    'macos-firefox': () => {
        return `Macintosh; Intel Mac OS X ${rD.macosVer()} rv:${rMR(60, 65)}.0`
    },
    'ios': () => {
        return `iPhone; CPU iPhone OS ${rD.iosVer()} like Mac OS X`
    },
    'android': () => {
        return `Linux; Android ${rD.androidVer()}; wv`
    },
    'android-huawei': () => {
        let tag = `${rML([`95^${rMW(3)}`, 'EDISON'])}-${rML(['AL', 'UL'])}${rMR(0, 2)}${rMR(0, 2)}`
        return `Linux; Android ${rD.androidVer()}; ${tag} Build/HUAWEI${tag}; wv`
    },
    'android-mi': () => {
        let miVerList = ['4LTE', '5', '5X', '5C', '5s', '5s Plus', '6', '6X', '8', '8 UD', '8 SE', '8 Lite', '9', 'MAX', 'MAX 2', 'MAX 3', 'PAD', 'PAD 4', 'NOTE', 'NOTE LTE']
        let miVer = rML([`MI ${rML(miVerList)}`, `MIX ${rML(['2', '2s', '3'])}`])
        let suf1 = `Build/${rML(['OPM1', 'PKQ1', 'OPR1'])}.${rMR(170000, 180729)}.${rMR(170000, 180729)}`
        let suf2 = `Build/${rMW(3)}${rMR(10, 30)}${rMW(1)}`
        let suf = rML([`${suf1}`, `${suf2}`])
        return `Linux; Android ${rD.androidVer()}; ${miVer} ${suf}; wv`
    },
}

/**
 * ua应用信息 eg. ie safari 360 chrome
 */
const appSufHandlerOfpc = {
    'windows': () => {
        return ``
    },
    'windows-qb': () => {
        return `QBCore/${rD.qbVer()} QQBrowser/${rD.qbcoreVer()}`
    },
    'windows-edge': () => {
        return `edge/${rD.edgeVer()}`
    },
    'windows-360': () => {
        return `QIHU 360SE`
    },
    'windows-firefox': () => {
        return `Gecko/20${rMR(13, 17)}${rMR(1, 12)}${rMR(1, 30)} Firefox/${rD.firefoxVer()}`
    },
    'macos': () => {
        return ``
    },
    'macos-firefox': () => {
        return `Gecko/20${rMR(13, 17)}${rMR(1, 12)}${rMR(1, 30)} Firefox/${rD.firefoxVer()}`
    },
    'ios': () => {
        return `Safari/${rD.safariVer()}`
    },
    'ios-qb': () => {
        return `MQQBrowser/${rMR(8, 10)}.${rMR(0, 5)}.${rMR(1, 5)} Safari/${rD.safariVer()} MttCustomUA/${rMR(1, 3)} QBWebViewType/${rMR(2, 5)} WKType/`
    },
    'ios-wechat': () => {
        return `MicroMessenger/${rMR(5, 7)}.${rMR(0, 3)}.${rMR(1, 5)}(0x${rMR(15000000, 23000000)}) NetType/${rD.networwVer()} Language/zh_CN`
    },
    'android': () => {
        return `Mobile Safari/${rD.safariVer()}`
    },
    'android-wechat': () => {
        return `Mobile Safari/${rD.safariVer()} MicroMessenger/${rMR(5, 7)}.${rMR(0, 3)}.${rMR(1, 5)}(0x${rMR(15000000, 23000000)}) NetType/${rD.networwVer()} Language/zh_CN`
    },
}

/**
 * 生成一个pc user-agent
 * @param {Object} opts
 */
const genOneUaOfpc = (opts) => {
    // 基金
    let foundation = 'Mozilla/5.0'

    // 系统
    let tag = `${opts.os}-${opts.app}`
    let osHandler = osHandlerOfpc[`${tag}`] || osHandlerOfpc[`${opts.os}`]
    let osInfo = osHandler()

    // 引擎
    let engine = `AppleWebKit/${rD.engineVer()} (KHTML\, like Gecko)`

    // 版本号、应用相关信息
    let version = `Version/${rD.versionVer()}`
    let chrome = `Chrome/${rD.chromeVer()}`
    let safari = `Safari/${rD.safariVer()}`
    let prefix = rML([`50^${version}`, `${chrome}`])
    let suffix = concatlList([`${prefix}`, `${safari}`])

    let ua = ''
    switch (tag) {
        case 'windows-ie':
            ua = `${foundation} (${osInfo})`
            break;
        case 'windows-':
            ua = `${foundation} (${osInfo}) ${engine} ${suffix}`
            break;
        case 'macos-':
            ua = `${foundation} (${osInfo}) ${engine} ${suffix}`
            break;
        default:
            let appSuf = appSufHandlerOfpc[`${tag}`] || appSufHandlerOfpc[`${opts.os}`]
            ua = `${foundation} (${osInfo}) ${engine} ${suffix} ${appSuf()}`
            break;
    }
    return ua
}

/**
 * 生成一个mobile user-agent
 * @param {Object} opts
 */
let genOneUaOfmobile = (opts) => {
    // 基金
    let foundation = 'Mozilla/5.0'

    // 系统
    let osInfo = ''
    if (opts.os === 'ios') {
        let tag = `${opts.os}-${opts.app}`
        let osHandler = osHandlerOfpc[`${tag}`] || osHandlerOfpc[`${opts.os}`]
        osInfo = osHandler()
    } else {
        let deviceTag = `${opts.os}-${opts.brand}`
        let osHandler = osHandlerOfpc[`${deviceTag}`] || osHandlerOfpc[`${opts.os}`]
        osInfo = osHandler()
    }

    // 引擎
    let engine = `AppleWebKit/${rD.engineVer()} (KHTML\, like Gecko)`

    // 版本号、应用相关信息
    let prefix = ''
    let version = `Version/${rD.versionVer()}`
    if (opts.os === 'ios') {
        let mobile = `Mobile/${rD.mobileVer()}`
        prefix = rML([`50^${version}`, `${mobile}`])
    } else {
        let chrome = `Chrome/${rD.chromeVer()}`
        prefix = rML([`50^${version}`, `${chrome}`])
    }

    let ua = ''
    let tag = `${opts.os}-${opts.app}`
    let appSuf = appSufHandlerOfpc[`${tag}`] || appSufHandlerOfpc[`${opts.os}`]
    switch (tag) {
        case 'ios-':
            ua = `${foundation} (${osInfo}) ${engine} ${prefix} ${appSuf()}`
            break;
        default:
            ua = `${foundation} (${osInfo}) ${engine} ${prefix} ${appSuf()}`
            break;
    }
    return ua
}

/**
 * 生成一个user-agent
 * @param {Object} opts
 */
let genOneUa = (opts) => {
    switch (opts.device) {
        case 'pc':
            return genOneUaOfpc(opts)
        case 'mobile':
            return genOneUaOfmobile(opts)
        default:
            break;
    }
}

/**
 * 随机生成一个浏览器的系统环境
 * device: pc | mobile
 * os: windows | macos | andriod | ios
 * app: safari | wechat | chrome | qb
 * brand: huawei | mi | oppo | vivo | samsung
 */
let genUaType = () => {
    const device = rD.device()
    const os = rD[`${device}Os`]()
    const app = rD[`${os}App`]()
    const brand = `${device}${os}` === 'mobileandroid' ? rD.androidDevice() : ''

    return {
        device,
        os,
        app,
        brand,
    }
}

let generateUa = (num = 1) => {
    num = parseInt(num)
    if (isNaN(num) || num < 1) num = 1

    let ret = []
    for (let n = 0; n < num; n++) {
        ret.push(genOneUa(genUaType()))
    }

    return ret[1] ? ret : ret[0]
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