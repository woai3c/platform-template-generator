const { search, button, table, page } = require('./template')
const { generateSearch, generateButton, generateTable, generatePage } = require('./trunk')

function createTemplate(vmdata, searchData, methods) {
    let result = `
            <template>
                <div>
            `

    if (search) {
        result += generateSearch(search, searchData, methods)
    }

    result += '<div class="main-content-container">'

    if (button) {
        result += generateButton(button, methods)
    }

    if (table) {
        result += generateTable(table)
    }

    if (page) {
        result += generatePage(page)
    }

    result += `       <div>
                    </div>
                </template>
            `

    return result
}

module.exports = createTemplate