#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const generateTemplate = require('../utils/generateTemplate')
const generateScript = require('../utils/generateScript')
let { name } = require(`${path.resolve(process.cwd())}/template.js`)

let pageStr = generateTemplate()
pageStr += `
${generateScript()}
`

pageStr += 
`<style scoped>
</style>
`

if (!name) name = 'index.vue'
fs.writeFile(`${path.resolve(process.cwd())}/${name}`, pageStr, err => {
    if (err) throw err
})