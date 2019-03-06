(function(){
/**
 * 生成userAgent
 * @param {Object} opts
 * device: pc | mobile
 * os: windows | macos | ios | android
 */
let createOneUa = () => {
    // 基金会
    let foundation = 'Mozilla/5.0'

    return foundation
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