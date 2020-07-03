const path = require('path')
const { search, button, table, pagination, modal } = require(`${path.resolve(process.cwd())}/template.js`)
const { generateSearch, generateButton, generateTable, generatePagination, generateModal } = require('./generator')
const beautify_html = require('js-beautify').html

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

    if (button || table) {
        result += generateButton(button, table)
    }

    if (table) {
        result += generateTable()
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

    return beautify_html(result, { indent_size: 4, eol: '\r\n', 'wrap-attributes': 'preserve', 'wrap-attributes-indent-size': 4 })
}

module.exports = generateTemplate