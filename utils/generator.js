const { generateComponent } = require('./component')
const { generateElementButton, generateVButton } = require('./button')
const { searchData, methods, pageData, tableData, tableMethods, paginationData, paginationMethods } = require('./data')
const { isRightBtn } = require('./button')

function generateSearch(data) {
    let result = 
`
        <div class="form-container">
            <el-form ref="searchForm" :model="searchData" label-width="${data.labelWidth? data.labelWidth : '80px'}">
                <el-row class="global-div-search">`

    data.options.forEach(item => {
        searchData[item.prop] = item.defaultVal? item.defaultVal : ''
        result += 
`                   
                    <el-col :lg="6" :md="8" :sm="12">
                        <el-form-item label="${item.label}" prop="${item.prop}">
                            ${generateComponent(item)}
                        </el-form-item>
                    </el-col>`
    })

    result += 
`                   
                    <el-button type="primary" class="global-btn-search" @click="search" v-if="global || permission.read">搜索</el-button>
                </el-row>
            </el-form>
        </div>`

    return result
}

function generateButton(data) {
    if (!data || !data.length) return ''
    let leftBtnStr = ''
    let rightBtnStr = ''
    data.forEach(item => {
        if (item.type == 'el-button') {
            leftBtnStr += generateElementButton(item)
        } else {
            if (isRightBtn(item.attrs.type)) {
                rightBtnStr += generateVButton(item)
            } else {
                leftBtnStr += generateVButton(item)
            }
        }
    })
    

    return `            <div class="btn-group">
                <div class="div-btn">
                    ${leftBtnStr.slice(1)}
                </div>
                <div class="right-btn">
                    ${rightBtnStr.slice(1)}
                </div>
            </div>
        `
}

function generateTable(data) {
    if (!data || !data.length) return ''
    Object.assign(pageData.data, tableData)
    Object.assign(methods, tableMethods)

    let result = `<el-table id="printTable" border stripe :data="tableData" highlight-current-row max-height="580"
                    @row-click="rowChange" :row-class-name="getRowIndex">`

    data.forEach(item => {
        result += `<el-table-column prop="${item.prop}" label="${item.label}"></el-table-column>`
    })

    result += '</el-table>'
    return result
}

function generatePagination() {
    Object.assign(pageData.data, paginationData)
    Object.assign(methods, paginationMethods)
    
    return `
            <el-pagination class="page-container"
                @size-change="sizeChange"
                @current-change="pageChange"
                :current-page="pageNumber"
                :page-sizes="[20, 30, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>`
}

module.exports = {
    generateSearch,
    generateButton,
    generateTable,
    generatePagination,
}