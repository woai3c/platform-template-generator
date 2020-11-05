const methods = {
    init: `init() {
        // 在这里执行初始化函数，包括国际化，表格数据查找
        getI18n([]).then(res => {

        })

        this.getCheckboxCache()
    },`,
}

const importData = {}
const searchData = {}
const pageData = {
    data: {
        global: true,
        permission: {},
        timer: null,
    },
    computed: `computed: {
        maxHeight() {
            return this.$store.state.app.maxTableHeight
        },
    },`,
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
        this.init()
    },`,
    mounted: `mounted() {
        this.$nextTick(() => {
            this.$calcTableHeight()
        })

        window.onresize = () => {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.$calcTableHeight()
            }, 50)
        }
    },`,
    destroyed: `destroyed() {
        window.onresize = null
        clearTimeout(this.timer)
    },`,
}

const tableData = {
    tableData: [],
    currentRow: null,
    sort: {}, // 当前排序的选项
    sortKey: [], // 需要排序的 key
    sortMap: {}, // 国际化映射 需要使用 getI18n 配置
    options: 'options',
    defaultOptions: '[...options]',
    checkedVals: 'options',
    labelMap: {}, // 表格文字映射 需要使用 getI18n 配置
}

const tableMethods = {
    isCustom: `isCustom(item) {
        return this.sortKey.includes(item)? 'custom' : false
    },`,
    rowChange: `rowChange(row) {
        this.currentRow = row.index
    },`,
    getRowIndex: `getRowIndex({ row, rowIndex }) {
        row.index = rowIndex
    },`,
    handleTableSortChange: `handleTableSortChange(column) {
        this.sort = {
            property: this.sortMap[column.column.label],
            sorted: column.order == 'descending'? 'DESC' : 'ASC',
        }
        
        // 默认获取数据函数，页面多个地方会使用，不注释是为了引起开发注意，统一替换
        this.getData()
    },`,
    resetCheckbox: `resetCheckbox() {
        this.options = [...this.defaultOptions]
        this.checkedVals = [...this.defaultOptions]
    },`,
    getCheckboxCache: `getCheckboxCache() {
        if (this.$getTableCache('vals')) this.checkedVals = this.$getTableCache('vals')
        if (this.$getTableCache('options')) this.options = this.$getTableCache('options')
    },`,
    isSelectedData: `isSelectedData() {
        if (this.currentRow === null) {
            this.$message.error(this.$t(110018))
            return
        }

        return true
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
        this.getData()
    },`,
    pageChange: `pageChange(pageNumber) {
        this.pageNumber = pageNumber
        this.getData()
    },`,
}

function serialize() {
    let result = 
`
${serializeImportData()}
export default {
    data() {
        const options = []
        return ${serializeData()}
    },
    ${pageData.computed}
    ${pageData.created}
    ${pageData.mounted}
    ${pageData.destroyed}
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

function serializeImportData() {
    let result = ''

    Object.keys(importData).forEach(key => {
        result += importData[key] + '\n'
    })

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
    subSerializeData,
    serialize,
    importData
}