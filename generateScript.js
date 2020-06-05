const { serialize } = require('./utils/data')
const beautify = require('js-beautify').js_beautify

function generateScript() {
    return `
<script>
export default {
    ${beautify(serialize(), { indent_size: 4, "brace_style": "collapse-preserve-inline", eol: '\r\n' })}
}
</script>
`
}

module.exports = generateScript