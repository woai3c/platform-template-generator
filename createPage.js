#!/usr/bin/env node
const fs = require('fs')
const generateTemplate = require('./generateTemplate')
const generateScript = require('./generateScript')

let pageStr = generateTemplate()
pageStr += `
${generateScript()}
`

pageStr += `
<style scoped>
</style>
`

fs.writeFile('template.vue', pageStr, err => {
    if (err) throw err
})