const methods = {}
const searchData = {}
const data = {
    global: true,
    perssion: {},
}

const tableData = {
    tableData: [],
    currentRow: null,
}

const pageData = {
    total: 0,
    pageSize: 20,
    pageNumber: 1,
}

const pageMethods = {
    sizeChange(pageSize) {
        this.pageSize = pageSize
        this.getUserData()
    },
    pageChange(pageNumber) {
        this.pageNumber = pageNumber
        this.getUserData()
    },
}

const tableMethods = {
    rowChange(row) {
        this.currentRow = row.index
    },
    getRowIndex({ row, rowIndex }) {
        row.index = rowIndex
    },
}

const created = {
    created() {
        const meta = this.$route.meta
        this.global = meta.global
        if (!this.global) {
            this.perssion = {}
            meta.perssion.forEach(item => {
                this.perssion[item] = true
            })
        }

        if (!this.global && !this.perssion.read) return
        this.getUserData()
    },
}