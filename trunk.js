function generateSearch(data, searchData) {
    let result = `
                <div class="form-container">
                    <el-form ref="searchForm" :model="searchData" label-width="${data.labelWidth? data.labelWidth : '80px'}">
                        <el-row class="global-div-search">
            `
    data.options.forEach(item => {
        searchData[item.prop] = item.defaultVal? item.defaultVal : ''
        result += `
                <el-col :lg="6" :md="8" :sm="12">
                    <el-form-item label="${item.label}" prop="${item.prop}">
                        ${generateComponent(item)}
                    </el-form-item>
                </el-col>
            `
    })

    result += `
                        <el-button type="primary" class="global-btn-search" @click="search" v-if="global || perssion.read">搜索</el-button>
                    </el-row>
                </el-form>
            </div>
        `
    return result
}

function generateButton() {
    return ''
}

function generateTable() {
    return ''
}

function generatePage() {
    return ''
}

module.exports = {
    generateSearch,
    generateButton,
    generateTable,
    generatePage,
}