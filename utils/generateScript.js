const { serialize } = require('./data')
const beautify = require('js-beautify').js_beautify

function generateScript() {
    return `
<script>
${beautify(serialize(), { indent_size: 4, "brace_style": "collapse-preserve-inline", eol: '\r\n' })}
</script>
`
}

module.exports = generateScript