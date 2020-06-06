const { methods, pageData } = require('./data')

function sliceMethod(method) {
    return method.split('(')[0]
}

function generateAttrStr(attrs, isWrap, isDynamic) {
    if (!attrs) return ''
    const keys = Object.keys(attrs)
    let result = ''
    keys.forEach(key => {
        if (isWrap) {
            result += '\n'
        }

        if (isDynamic) {
            result += ` :${key}="${attrs[key]}"`
            pageData.data[attrs[key]] = `''` // 默认值为空字符串
        } else {
            result += ` ${key}="${attrs[key]}"`
        }
    })

    return result.slice(1)
}

function generateEventsStr(events, isWrap) {
    if (!events) return ''
    const keys = Object.keys(events)
    let result = ''
    keys.forEach(key => {
        methods[sliceMethod(events[key])] = `${sliceMethod(events[key])}() {

                                                                        },`

        if (isWrap) {
            result += '\n'
        }                

        result += ` @${key}="${events[key]}"`
    })

    return result.slice(1)
}

module.exports = {
    generateAttrStr,
    generateEventsStr,
    sliceMethod,
}