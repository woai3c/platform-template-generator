<template>
    <div>
        <div class="form-container">
            <el-form ref="searchForm" :model="searchData" label-width="80px">
                <el-row class="global-div-search">
                    <el-col :lg="6" :md="8" :sm="12">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="searchData.name" placeholder="请输入手机号" type="tel" />
                        </el-form-item>
                    </el-col>
                    <el-col :lg="6" :md="8" :sm="12">
                        <el-form-item label="部门" prop="department">
                            <el-select v-model="searchData.department" placeholder="请选择" @change="handleChange">
                                <el-option
                                    v-for="item in testOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-button type="primary" class="global-btn-search" @click="search" v-if="global || permission.read">搜索</el-button>
                </el-row>
            </el-form>
        </div>

        <div class="main-content-container">
            <div class="btn-group">
                <div class="div-btn">
                    <VButton v-if="global || permission.add" type="add" @callback="showModal(0)" />
                    <el-button type="primary" @click="handleClick">这是一个测试按钮</el-button>
                    <VButton v-if="global || permission.update" type="edit" @callback="showModal(1)" />
                </div>
                <div class="right-btn">
                    <VButton v-if="global || permission.export" type="export" @callback="exportFile" />
                </div>
            </div>
            <el-table id="printTable" border stripe :data="tableData" highlight-current-row max-height="580"
                @row-click="rowChange" :row-class-name="getRowIndex">
                <el-table-column prop="dataTypeName" label="选项名称"></el-table-column>
                <el-table-column prop="dataItemName" label="选项内容"></el-table-column>
            </el-table>
            <el-pagination class="page-container"
                @size-change="sizeChange"
                @current-change="pageChange"
                :current-page="pageNumber"
                :page-sizes="[20, 30, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            global: true,
            permission: {},
            tableData: [],
            currentRow: {},
            total: 0,
            pageSize: 20,
            pageNumber: 1,
        }
    },
    created() {
        const meta = this.$route.meta
        this.global = meta.global
        if (!this.global) {
            this.permission = {}
            meta.permission.forEach(item => {
                this.permission[item] = true
            })
        }

        if (!this.global && !this.permission.read) return
        this.getUserData()
    },
    methods: {
        handleChange() {

        },
        showModal() {

        },
        handleClick() {

        },
        exportFile() {

        },
        rowChange(row) {
            this.currentRow = row.index
        },
        getRowIndex({ row, rowIndex }) {
            row.index = rowIndex
        },
        sizeChange(pageSize) {
            this.pageSize = pageSize
            this.getUserData()
        },
        pageChange(pageNumber) {
            this.pageNumber = pageNumber
            this.getUserData()
        },
    }
}
</script>


<style scoped>
</style>
