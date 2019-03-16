let uaO = require('./index.js')
let uaT = require('./random-http-ua.js')
let uaM = require('./random-http-ua.min.js')

let result1 = uaO.generateUa(20, {
    device: ['pc'],
    pcOs: ['macos', '90^windows'],
})
let result2 = uaT.generateUa(20, {
    device: ['mobile'],
    mobileOs: ['android', '90^ios'],
})
let result3 = uaM.generateUa(60, {
    device: ['pc', '80^mobile'],
    pcOs: ['macos'],
    mobileOs: ['80^android', 'ios'],
})

console.log('\n~~~~~~~~~~~~~~ origin ~~~~~~~~~~~~~~~~')
console.log(result1.join('\n'))

console.log('\n~~~~~~~~~~~~~~ trans ~~~~~~~~~~~~~~~~')
console.log(result2.join('\n'))

console.log('\n~~~~~~~~~~~~~~ min ~~~~~~~~~~~~~~~~')
console.log(result3.join('\n'))
