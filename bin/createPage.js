#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const generateTemplate = require(`${__dirname}/../generateTemplate`)
const generateScript = require(`${__dirname}/../generateScript`)
let { name } = require(`${__dirname}/../template`)

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