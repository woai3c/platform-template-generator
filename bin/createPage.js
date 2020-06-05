#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const generateTemplate = require(`${__dirname}/../generateTemplate`)
const generateScript = require(`${__dirname}/../generateScript`)

let pageStr = generateTemplate()
pageStr += `
${generateScript()}
`

pageStr += `
<style scoped>
</style>
`

fs.writeFile(`${path.resolve(process.cwd())}/template.vue`, pageStr, err => {
    if (err) throw err
})