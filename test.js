let uaT = require('./random-http-ua.js')

console.log('\n~~~~~~~~~~~~~~ origin ~~~~~~~~~~~~~~~~')
console.log(uaT.generateUa(50).join('\n'))

console.log('\n~~~~~~~~~~~~~~ pc windows qb ~~~~~~~~~~~~~~~~')
console.log(uaT.generateUa(5,{
    device: ['pc'],
    pcOs: ['windows'],
    windowsApp: ['qb'],
}).join('\n'))

console.log('\n~~~~~~~~~~~~~~ pc macos firefox ~~~~~~~~~~~~~~~~')
console.log(uaT.generateUa(5,{
    device: ['pc'],
    pcOs: ['macos'],
    macosApp: ['firefox'],
}).join('\n'))

console.log('\n~~~~~~~~~~~~~~ mobile ios app ~~~~~~~~~~~~~~~~')
console.log(uaT.generateUa(5,{
    device: ['mobile'],
    mobileOs: ['ios'],
    iosApp: ['wechat', 'qb'],
}).join('\n'))

console.log('\n~~~~~~~~~~~~~~ mobile android brand ~~~~~~~~~~~~~~~~')
console.log(uaT.generateUa(5,{
    device: ['mobile'],
    mobileOs: ['android'],
    androidBrand: ['huawei', 'samsung'],
}).join('\n'))

console.log('\n~~~~~~~~~~~~~~ mobile android app ~~~~~~~~~~~~~~~~')
console.log(uaT.generateUa(5,{
    device: ['mobile'],
    mobileOs: ['android'],
    androidApp: ['baidu', 'native'],
}).join('\n'))
