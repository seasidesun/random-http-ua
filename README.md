# random-http-ua

随机生成一个http请求的`user-agent`

## Feature

- 支持pc端：winodws、 macos
- 支持移动端：android、 ios
- android端支持机型：huawei、 mi、 vivo、 oppo、 samsung
- 支持各种应用：qq浏览器、 uc浏览器、 ie、 chrome、 safari、 微信
- 可指定随机概率
- 自定义ua类型（详细见下文Params）

## Install

```
npm i random-http-ua
```

## Useage

```
/**
 * 随机生成浏览器的ua
 * @param {String | Number} ua的数量
 * @param {Object} 自定义ua的类型(可设置概率，详见例子)
 * @return {String | Array} ua
 */
generateUa(num = 1, opts = {})
```

eg.
```
// 生成100个ua：移动端占70%，其中ios占90%；pc占比30%(100%-70%)，其中全部为macos
let randomUa = require('random-http-ua')
randomUa.generateUa(100, {
    device: ['pc', '70^mobile'],
    pcOs: ['macos'],
    mobileOs: ['android', '90^ios'],
})
```

## Params

```
// 可自定义的ua类型
opts: {
    'device':       Array  eg.['mobile', 'pc']                                  // 设备类型
    'pcOs':         Array  eg.['windows', 'macos']                              // pc端操作系统
    'mobileOs':     Array  eg.['android', 'ios']                                // 移动端操作系统
    'windowsApp':   Array  eg.['ie', 'edge', 'qb', 'chrome', 'firfox', '360']   // win系统下的浏览器应用
    'macosApp':     Array  eg.['safari', 'chrome', 'firfox']                    // macos系统下的浏览器应用
    'iosApp':       Array  eg.['safari', 'qb', 'wechat']                        // ios浏览器应用
    'androidBrand': Array  eg.['huawei', 'mi', 'vivo', 'oppo', 'samsung']       // 安卓机型
    'androidApp':   Array  eg.['wechat', 'uc', 'baidu', 'qb', 'native']         // 浏览器应用
}
```

## Todo

- [X] 增加更多的自定义设置
- [ ] 增加英文文档
- [ ] 增加更多的安卓机型、浏览器应用
