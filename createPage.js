const { search, button, table, page } = require('./template')
const { generateSearch, generateButton, generateTable, generatePage } = require('./trunk')

const templateData = {}
const searchData = {}
const methods = {}
const table = []
let template = `
            <template>
                <div>
            `

if (search) {
    template += generateSearch(search, searchData, methods)
}

template += '<div class="main-content-container">'

if (button) {
    template += generateButton(button, methods)
}

if (table) {
    template += generateTable(table)
}

if (page) {
    template += generateTable(page)
}

template += '<div>'