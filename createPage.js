const createTemplate = require('./createTemplate')
const createScript = require('./createScript')

let page = createTemplate()
page += createScript()
page += `<style scoped>
        </style>`

console.log(page)