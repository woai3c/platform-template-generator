const { search, button, table, pagination } = require('./template')
const { generateSearch, generateButton, generateTable, generatePagination } = require('./utils/generator')
const beautify_html = require('js-beautify').html;

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
    </div>
</template>
            `

    return beautify_html(result, { indent_size: 4, eol: '\r\n', 'wrap-attributes': 'preserve', 'wrap-attributes-indent-size': 4 })
}

module.exports = generateTemplate