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

function serialize() {
    let result = `
                data() {
                    return ${serializeData()}
                },
                ${pageData.created}
                methods: ${serializeMethods()}
            `
    return result
}

function serializeData() {
    const data = pageData.data
    const keys = Object.keys(data)
    let result = '{'
    keys.forEach(key => {
        let value = data[key]
        if (Array.isArray(value)) {
            value = '[]'
        } else if (typeof value == 'object') {
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
}