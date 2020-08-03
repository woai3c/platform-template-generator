const { generateAttrStr, generateEventsStr } = require('./index')
const { pageData } = require('./data')

function generateComponent(data) {
    let result = ''
    switch (data.type) {
        case 'input':
            result += generateInputComponent(data)
            break
        case 'select':
            result += generateSelectComponent(data)
            break
        case 'date':
            result += generateDatePickerComponent(data)
            break
    }

    return result
}

function generateInputComponent(data) {
    return `<v-input v-model="searchData.${data.prop}" ${generateAttrStr(data.attrs)} ${generateAttrStr(data.dattrs, false, true)} ${generateEventsStr(data.events)} />`
}

function generateSelectComponent(data) {
    if (data.options) {
        pageData.data[data.options] = []
    }

    return (
`<el-select v-model="searchData.${data.prop}" ${generateAttrStr(data.attrs)} ${generateAttrStr(data.dattrs, false, true)} ${generateEventsStr(data.events)}>
                                <el-option
                                    v-for="item in ${data.options}"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>`)
}

function generateDatePickerComponent(data) {
    return (
        `<el-date-picker 
                                        v-model="searchData.${data.prop}"
                                        ${generateAttrStr(data.attrs, true)}
                                        ${generateAttrStr(data.dattrs, false, true)}
                                        ${generateEventsStr(data.events, true)}
                                    >
                                    </el-date-picker>`)
}

module.exports = {
    generateComponent
}