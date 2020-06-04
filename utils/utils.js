const { methods } = require('./createPage')
function sliceMethod(method) {
    return method.split('(')[0]
}

function generateAttrStr(attrs) {
    if (!attrs) return ''
    const keys = Object.keys(attrs)
    let result = ''
    keys.forEach(key => {
        result += ` ${key}="${attrs[key]}"`
    })

    return result.slice(1)
}

function generateEventsStr(events) {
    if (!events) return ''
    const keys = Object.keys(events)
    let result = ''
    keys.forEach(key => {
        methods[sliceMethod(events[key])] = `${sliceMethod(events[key])}() {},`
        result += ` @${key}="${events[key]}"`
    })

    return result.slice(1)
}

module.exports = {
    generateAttrStr,
    generateEventsStr
}