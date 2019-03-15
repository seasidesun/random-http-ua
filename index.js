/**
 * 随机生成http的user-agent
 * NPM NAME : random-http-ua
 * vervison : v1.0.1
 * Github : https://github.com/seasidesun/random-http-ua
 * Author : seasidesun
 * Email : seasidetank@gmail.com
 */
(function(){
/**
 * 根据所给概率返回此次随机是否落在概率区间
 * @param {Number} rate 概率 0-10
 * @return {Boolean} 是否概率落在区间
 */
const rMP = (rate) => {
    let seed = parseInt(Math.random().toString().slice(2, 4))
    return seed < rate
}

/**
 * 根据所给概率返回此次随机是否有值
 * @param {String} data 概率^有效值
 * @return {String} 有效值
 */
const rMPR = (data) => {
    data = data.split('^')
    if (!data[1]) return data[0]
    return rMP(data[0]) ? data[1] : ''
}

/**
 * 随机输出数组内的元素
 * @param {Array || String} list 供随机的数据
 * @return {String} 随机出的数据
 */
const rML = (list) => {
    if (!(list instanceof Array)) list = [list]

    let listNoRate = []
    let listWithRate = []
    list.forEach((data) => {
        if (data.indexOf('^') !== -1) listWithRate.push(data)
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
 * @return {String} 随机出的字母
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
 * @return {String} 随机出的数字
 */
const rMR = (from, to) => {
    from = parseInt(from)
    to = parseInt(to)

    if (isNaN(from)) return ''
    if (isNaN(to)) to = 0
    if (from === to) return from

    const base = Math.min(from, to)
    const range = Math.abs(from - to) + 1
    const randomRange = range.toString().length + 1 // 随机时要比实际大一位，因为最后要取余数
    let seed = parseInt(Math.random().toString().slice(-randomRange).split('').reverse().join(''))
    let jump = seed % range

    return base + jump
}

/**
 * 将数组里的元素拼成一个字符串，['', ';']过滤掉
 * @param {Array || String} list
 * @return {String} ua的一部分
 */
const cL = (list) => {
    if (!(list instanceof Array)) list = [list]
    return list.filter((item) => {return ['', ';'].indexOf(item) === -1}).join(' ')
}

/**
 * 供随机的数据
 * device: 设备类型 mobile || pc
 * 
 * pcOs: pc端操作系统
 * mobileOs: 移动端操作系统
 * 
 * windowsVer: windows系统版本
 * windowsBit: windows系统Bit位
 * windowsApp: windows系统下的浏览器应用 eg.ie、chrome
 * 
 * macosVer: macos系统版本
 * macosApp: macos系统下的浏览器应用 eg.safari、chrome
 * 
 * iosVer: ios版本
 * iosApp: ios浏览器应用
 * 
 * androidVer: 安卓版本
 * androidDevice: 安卓机型 eg.samsung、huawei、mi
 * androidApp: 安卓浏览器应用 eg.uc、wechat
 * 
 * UA中的部分字符串随机：
 * engineVer: ua中浏览引擎版本
 * versionVer: ua中浏览引擎版本加号版本
 * chromeVer: ua中chrome版本
 * safariVer: ua中safari版本
 * mobileVer: ua中Mobile版本
 * networwVer: ua中网络类型
 * netVer: ua中'.net'版本，重要是ie中使用到
 * ieVer: ie版本
 * tridentVer: trident版本，主要ie中使用到
 * qbVer: qq浏览器版本
 * qbcoreVer: qq浏览器core版本
 * edgeVer: egde浏览器版本
 * firefoxVer: firefox浏览器版本
 */

const customDefault = {
    'device': ['mobile', 'pc'],
    'pcOs': ['windows', 'macos'],
    'mobileOs': ['android', 'ios'],
}
const rD = {
    'device': () => rML(customDefault['device']),
    'pcOs': () => rML(customDefault['pcOs']),
    'mobileOs': () => rML(customDefault['mobileOs']),

    'windowsVer': () => rML(['5.1', '6.1', '10.0']),
    'windowsBit': () => rML(['WOW64', 'Win64; x64']),
    'windowsApp': () => rML(['ie', 'edge', 'qb', 'chrome', 'firfox', '360']),

    'macosVer': () => rML(['10_13_1', '10_13_2', '10_13_3', '10_13_4', '10_13_5', '10_13_6', '10_14_1', '10_14_2', '10_14_3']),
    'macosApp': () => rML(['safari', 'chrome', 'firfox']),

    'iosVer': () => rML([`10_${rMR(1, 2)}`, `11_${rMR(1, 4)}_${rMR(1, 4)}`, `12_${rMR(1, 2)}_${rMR(1, 4)}`]),
    'iosApp': () => rML(['safari', 'qb', 'wechat']),

    'androidVer': () => `${rMR(7, 9)}.${rMR(0, 5)}${rMPR(`80^.${rMR(0, 5)}`)}`,
    'androidDevice': () => rML(['huawei', 'mi', 'vivo', 'oppo', 'samsung']),
    'androidApp': () => rML(['wechat', 'uc', 'baidu', 'qb', '']),

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
 * ua-系统信息部分，一般放在ua的引擎后面
 */
const osHandlerOfpc = {
    'windows': () => {
        return `Windows NT ${rD.windowsVer()}; ${rD.windowsBit()}`
    },
    'windows-ie': () => {
        return cL([
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
        let miVerList = ['4LTE', '5', '5X', '5C', '5s', '5s Plus', '6', '6X', '8', '8 UD',
                        '8 SE', '8 Lite', '9', 'MAX', 'MAX 2', 'MAX 3', 'PAD', 'PAD 4', 'NOTE', 'NOTE LTE']
        let miVer = rML([`MI ${rML(miVerList)}`, `MIX ${rML(['2', '2s', '3'])}`])
        let suf1 = `Build/${rML(['OPM1', 'PKQ1', 'OPR1'])}.${rMR(170000, 180729)}.${rMR(170000, 180729)}`
        let suf2 = `Build/${rMW(3)}${rMR(10, 30)}${rMW(1)}`
        let suf = rML([`${suf1}`, `${suf2}`])
        return `Linux; Android ${rD.androidVer()}; ${miVer} ${suf}; wv`
    },
    'android-oppo': () => {
        let oppoVerList = ['r9 plustm a', 'A57t', 'R9m', 'R9t', 'A79t', 'R11t', 'A57', 'A37m',
                        'R11', 'A59s', 'R9sk', 'A73t', 'A83', 'R9 Plustm A', 'R9s', 'R9tm', 'R11s',
                        'A77', 'A79k', 'R11st', 'A77t', 'A33', 'A53', 'A59m', 'R11 Plus', 'R9s Plus',
                        'A83t', 'R9', 'A59t', 'R9skt', 'A37t', 'A53m', 'A73', 'R7sm', 'R7s', 'R9st',
                        'r7s', 'r9', 'a37m', 'r9m', 'R11 Plusk', 'r9 plusm a']
        let tag = `OPPO ${rML(oppoVerList)} Build/${rMW(3)}${rMR(10, 30)}${rMW(1)}`
        return `Linux; Android ${rD.androidVer()}; ${tag}; wv`
    },
    'android-vivo': () => {
        let vivoVerList = ['X21i A', 'X9Plus', 'Y66L', 'Y66', 'X20', 'V3Max A', 'X7', 'NEX A', 'Y31',
                        'X9i', 'Y85A', 'Y75A', 'X9s', 'Xplay6', 'Y83A', 'X7Plus', 'X9s Plus', 'X9s L',
                        'X9', 'X9L', 'X6Plus D', 'Y71', 'X21UD A', 'Y51A', 'X6Plus L', 'Y71A', 'X20A',
                        'Y66i A', 'X6A', 'X21', 'X9Plus L', 'Y53L', 'V3M A', 'X6D', 'X21A', 'V3', 'Y66i', 
                        'X6S A', 'Z1', 'X3V', 'Y67L', 'X20Plus A', 'Xplay5A', 'Z1i', 'NEX S']
        let tag = `vivo ${rML(vivoVerList)} Build/${rML(['OPM1', 'PKQ1', 'OPR1'])}.${rMR(17000, 180128)}.0${rMR(1, 99)}`
        return `Linux; Android ${rD.androidVer()}; ${tag}; wv`
    },
    'android-samsung': () => {
        let samsungVerList = ['G9550', 'C7000', 'G9500', 'C5000', 'G9600', 'N9500', 'G9200', 'G9508',
                        'G6100', 'G9287', 'N9600', 'C7010', 'G9350', 'G9280', 'N9006', 'G9300', 'J3109',
                        'C9000', 'G935F', 'N950N', 'G9650', 'A500FU', 'C5010', 'J5008', 'A5000', 'G955F',
                        'A9100', 'E7009', 'G8508S', 'W2018', 'J3110', 'G955U', 'G5700', 'A7100', 'A7000',
                        'G9608', 'G8850', 'G8750', 'A600N', 'A8000', 'J7008', 'G950U', 'N9508', 'G5108Q',
                        'N9108V', 'G9008V', 'N920I', 'G610F', 'A6050', 'W2016', 'C9008', 'G9750', 'G3606',
                        'A5108', 'J5108', 'P585Y', 'G928V', 'T331C', 'N9005', 'N960F', 'G7105', 'N9200',
                        'G1600', 'J250F', 'N9008V', 'G8870']
        let tag = `SM-${rML(samsungVerList)} Build/${rMW(`${rMR(1, 3)}`)}${rMR(0, 99)}${rMW(1)}`
        return `Linux; Android ${rD.androidVer()}; ${tag}; wv`
    },
}

/**
 * ua-应用信息部分，一般放在ua的最后面 eg. ie safari 360 chrome
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
    'android-baidu': () => {
        return `Mobile Safari/${rD.safariVer()}${rML(['2^ ', ` T7/${rMR(6, 9)}.${rMR(1, 9)} `])}baidubrowser/${rMR(1, 9)}.${rMR(10, 19)}.${rMR(10, 19)}.0 (Baidu; P1 ${rMR(1, 9)}.${rMR(0, 9)}.${rMR(0, 9)})`
    },
    'android-uc': () => {
        return `UCBrowser/${rMR(10, 12)}.${rMR(0, 5)}.${rMR(0, 9)}.${rMR(100, 983)} Mobile Safari/${rD.safariVer()}`
    },
    'android-qb': () => {
        return `MQQBrowser/${rMR(6, 8)}.${rMR(1, 9)} TBS/0${rMR(41000, 45000)} Mobile Safari/${rD.safariVer()}`
    },
}

/**
 * 生成一个pc user-agent
 * @param {Object} opts
 * @return {String} ua
 */
const genOneUaOfpc = (opts) => {
    // 基金
    let foundation = 'Mozilla/5.0'

    // 系统
    let tag = `${opts.os}-${opts.app}` // eg. windows-ie、macos-chrome
    let osHandler = osHandlerOfpc[`${tag}`] || osHandlerOfpc[`${opts.os}`]
    let osInfo = osHandler()

    // 引擎
    let engine = `AppleWebKit/${rD.engineVer()} (KHTML\, like Gecko)`

    // 版本号、应用相关信息
    let version = `Version/${rD.versionVer()}`
    let chrome = `Chrome/${rD.chromeVer()}`
    let safari = `Safari/${rD.safariVer()}`
    let prefix = rML([`50^${version}`, `${chrome}`])
    let suffix = cL([`${prefix}`, `${safari}`])

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
            ua = cL([`${foundation}`, `(${osInfo})`, `${engine}`, `${suffix}`, `${appSuf()}`])
            break;
    }
    return ua
}

/**
 * 生成一个mobile user-agent
 * @param {Object} opts
 * @return {String} ua
 */
const genOneUaOfmobile = (opts) => {
    // 基金
    let foundation = 'Mozilla/5.0'

    // 系统
    let osInfo = ''
    if (opts.os === 'ios') {
        let tag = `${opts.os}-${opts.app}` // eg. os-wechat、ios-qb
        let osHandler = osHandlerOfpc[`${tag}`] || osHandlerOfpc[`${opts.os}`]
        osInfo = osHandler()
    } else {
        let deviceTag = `${opts.os}-${opts.brand}` // eg. android-huawei、android-mi
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
    let tag = `${opts.os}-${opts.app}` // eg. ios-wechat、android-uc
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
 * 生成一个ua
 * @param {Object} opts 浏览器系统环境
 * @return {String} ua
 */
const genOneUa = (opts) => {
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
 * @return {Object} 浏览器系统环境
 * device: pc | mobile
 * os: windows | macos | andriod | ios
 * app: safari | wechat | chrome | qb
 * brand: huawei | mi | oppo | vivo | samsung
 */
const genUaType = () => {
    const device = rD.device()
    const os = rD[`${device}Os`]()
    const app = rD[`${os}App`]()
    const brand = `${device}${os}` === 'mobileandroid' ? rD.androidDevice() : '' // 只有安卓机器分机型

    return {
        device,
        os,
        app,
        brand,
    }
}

/**
 * 随机生成浏览器的ua
 * @param {String | Number} ua的数量
 * @param {Object} ua的类型
 * @return {String | Array} 浏览器ua
 */
const generateUa = (num = 1, opt = {}) => {
    num = parseInt(num)
    if (isNaN(num) || num < 1) num = 1

    Object.keys(customDefault).forEach((key) => {
        rD[key] = () => rML(opt[key] || customDefault[key])
    })

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