const { generateAttrStr, generateEventsStr } = require('./index')

function generateComponent(data) {
    let result = ''
    switch (data.type) {
        case 'input':
            result += generateInputComponent(data)
            break
        case 'select':
            result += generateSelectComponent(data)
            break
    }

    return result
}

function generateInputComponent(data) {
    return `<el-input v-model="searchData.${data.prop}" ${generateAttrStr(data.attrs)} ${generateEventsStr(data.events)} />`
}

function generateSelectComponent(data) {
    return (
`<el-select v-model="searchData.${data.prop}" ${generateAttrStr(data.attrs)} ${generateEventsStr(data.events)}>
                                <el-option
                                    v-for="item in ${data.options}"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>`)
}

module.exports = {
    generateComponent
}