const { generateComponent } = require('./generateComponent')
const { generateElementButton, generateVButton, isRightBtn } = require('./button')
const { searchData, subSerializeData, methods, pageData, tableData, tableMethods, paginationData, paginationMethods, importData } = require('./data')
const { generateAttrStr, generateEventsStr } = require('./index')

function generateSearch(data) {
    let result = 
`
        <Search @search="search" @reset="resetSearch" v-if="global || permission.read">
            <el-form ref="searchForm" :model="searchData" label-width="${data.labelWidth? data.labelWidth : '80px'}">
                <el-row class="global-div-search">`

    methods.search = `search(val) {
        if (val !== undefined) {
            this.searchData.globalSearchValue = val
        } else {
            this.searchData.globalSearchValue = ''
        }

        this.pageNumber = 1
        this.getData()
    },`

    data.options.forEach(item => {
        if (typeof item.defaultVal == 'string') {
            searchData[item.prop] = `'${item.defaultVal}'`
        } else {
            searchData[item.prop] = item.defaultVal
        }
        
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
                </el-row>
            </el-form>
        </Search>`

    
    // 模糊查询参数
    searchData.globalSearchValue = `''`
    methods.resetSearch = `resetSearch() {
        // 重置 searchData
        this.searchData = ${subSerializeData(searchData)}
    },`

    return result
}

function generateButton(data, hasTable) {
    if (!data || !data.length) {
        return `<div class="global-btn-group">
            <div class="global-div-btn"></div>
            <div class="global-right-btn">
                <CheckboxGroup @reset="resetCheckbox" :options="options" :map="labelMap" v-model="checkedVals" />
            </div>
        </div>`
    }

    let leftBtnStr = ''
    let rightBtnStr = ''
    data.forEach(item => {
        if (item.attrs && item.attrs.type == 'export') {
            importData.export = `import { downloadFile } from '@/utils/utils'`
        }

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
    
    let str = hasTable
                ? rightBtnStr.slice(1) + '<CheckboxGroup @reset="resetCheckbox" :options="options" :map="labelMap" v-model="checkedVals" />'
                : rightBtnStr.slice(1)

    return `            <div class="global-btn-group">
                <div class="global-div-btn">
                    ${leftBtnStr.slice(1)}
                </div>
                <div class="global-right-btn">
                    ${str}
                </div>
            </div>`
}

function generateTable() {
    Object.assign(pageData.data, tableData)
    Object.assign(methods, tableMethods)

    return `
            <el-table id="printTable" border stripe :data="tableData" highlight-current-row @row-click="rowChange" :max-height="maxHeight"
            :row-class-name="getRowIndex" @sort-change="handleTableSortChange">
                <el-table-column v-for="(item, index) in checkedVals" :key="index" :label="labelMap[item]" 
                :sortable="isCustom(item)">
                    <template slot-scope="scope">
                        <span v-if="item != 'detail'">
                            {{ scope.row[item] }}
                        </span>
                        <span v-else @click="showDetail(scope.row)" class="global-span-detail">详情</span>
                    </template>
                </el-table-column>
            </el-table>`
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

function generateModal(data) {
    if (!data || !data.length) return ''
    let result = ''
    data.forEach(item => {
        result += 
        `
        <Modal ${generateAttrStr(item.attrs)} ${generateAttrStr(item.dattrs, false, true)} ${generateEventsStr(item.events)}>

        </Modal>
        `
    })

    return result
}

module.exports = {
    generateSearch,
    generateButton,
    generateTable,
    generatePagination,
    generateModal,
}