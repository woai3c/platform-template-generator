const path = require('path')
const { search, button, table, pagination, modal } = require(`${path.resolve(process.cwd())}/template.js`)
const { generateSearch, generateButton, generateTable, generatePagination, generateModal } = require('./generator')
const beautify_html = require('js-beautify').html
const { tableHeight } = require('./data')

function generateTemplate() {
    let result = 
`<template>
    <div>`

    if (search) {
        result += generateSearch(search)
    }

    result += `
    
        <div class="main-content-container">
`

    if (button) {
        result += generateButton(button)
    }

    if (table) {
        result += generateTable(table)
    }

    if (pagination) {
        result += generatePagination()
    }

    result += `       
        </div>
        `

    if (modal) {
        result += generateModal(modal)
    }

    result += ` </div>
</template>
            `

    result = result.replace('templateTableMaxHeight', tableHeight.max)
    return beautify_html(result, { indent_size: 4, eol: '\r\n', 'wrap-attributes': 'preserve', 'wrap-attributes-indent-size': 4 })
}

module.exports = generateTemplate