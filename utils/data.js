const path = require('path')
const { modal, button } = require(`${path.resolve(process.cwd())}/template.js`)

const methods = {}
const searchData = {}
const pageData = {
    data: {
        global: true,
        permission: {},
    },
    created: `created() {
        const meta = this.$route.meta
        this.global = meta.global
        if (!this.global) {
            this.permission = {}
            meta.permission.forEach(item => {
                this.permission[item] = true
            })
        }

        if (!this.global && !this.permission.read) return
    },`,
}

const tableHeight = {
    max: 825 // 默认高度
}

const tableData = {
    tableData: [],
    currentRow: null,
}

const tableMethods = {
    rowChange: `rowChange(row) {
        this.currentRow = row.index
    },`,
    getRowIndex: `getRowIndex({ row, rowIndex }) {
        row.index = rowIndex
    },`,
}

const paginationData = {
    total: 0,
    pageSize: 20,
    pageNumber: 1,
}

const paginationMethods = {
    sizeChange: `sizeChange(pageSize) {
        this.pageSize = pageSize
        this.getUserData()
    },`,
    pageChange: `pageChange(pageNumber) {
        this.pageNumber = pageNumber
        this.getUserData()
    },`,
}

// function generateImort() {
//     let result = ''
//     if (modal) {
//         result += `import Modal from '@/components/Modal'
//         `
//     }

//     let hasVButton = false
//     if (button) {
//         for (let i = 0, len = button.length; i < len; i++) {
//             if (!button[i].type) {
//                 hasVButton = true
//                 break
//             }
//         }
//     }
    
//     if (hasVButton) {
//         result += `import VButton from '@/components/VButton'
//         `
//     }

//     return result
// }

// function generateComponents() {
//     let hasVButton = false
//     if (button) {
//         for (let i = 0, len = button.length; i < len; i++) {
//             if (!button[i].type) {
//                 hasVButton = true
//                 break
//             }
//         }
//     }

//     if (!modal && !hasVButton) {
//         return ''
//     }

//     let result = 'components: { '
//     if (modal) {
//         result += 'Modal'
//     }

//     if (hasVButton) {
//         if (modal) result += ', '
//         result += 'VButton'
//     }

//     return result + ' },'
// }

function serialize() {
    let result = 
`
export default {
    data() {
        return ${serializeData()}
    },
    ${pageData.created}
    methods: ${serializeMethods()}
}
`
    return result
}

function serializeData() {
    const data = pageData.data
    data.searchData = subSerializeData(searchData)
    return subSerializeData(data)
}

function subSerializeData(data) {
    const keys = Object.keys(data)
    let result = '{'
    keys.forEach(key => {
        let value = data[key]
        if (Array.isArray(value)) {
            value = '[]'
        } else if (typeof value == 'object' && value !== null) {
            value = '{}'
        }
        
        result += `${key}: ${value},\n`
    })

    result += '}'
    return result
}

function serializeMethods() {
    const keys = Object.keys(methods)
    let result = '{'
    keys.forEach(key => {
        result += '\n' + methods[key]
    })

    result += '}'
    return result
}

module.exports = {
    searchData,
    methods,
    pageData,
    tableMethods,
    tableData,
    paginationData,
    paginationMethods,
    serialize,
    tableHeight,
}