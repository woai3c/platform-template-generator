#!/usr/bin/env node
const fs = require('fs')

const data =
`const template = {
    // 搜索区
    search: {
        labelWidth: '80px',
        options: [
            {
                prop: 'name',
                defaultVal: '',
                label: '用户名',
                type: 'input',
                attrs: {
                    placeholder: '请输入手机号',
                    type: 'tel',
                }
            },
            {
                prop: 'department',
                defaultVal: '',
                label: '部门',
                type: 'select',
                attrs: {
                    placeholder: '请选择',
                },
                options: 'testOptions',
                events: {
                    change: 'handleChange',
                }
            }
        ]
    },

    // 按钮区
    button: [
        {
            attrs: {
                type: 'add'
            },
            callback: 'showModal(0)',
            // permission: 'add', 如果不写权限，将按默认配置的权限设置，如果没有找到默认配置，则不添加权限。具体配置请看 utils/button.js
        },
        {
            type: 'el-button', // 默认为 VButton 组件，如需使用 el-button，需要显式设置
            attrs: {
                type: 'primary'
            },
            events: {
                click: 'handleClick'
            },
            text: '这是一个测试按钮',
        },
        {
            attrs: {
                type: 'edit',
            },
            callback: 'showModal(1)',
        },
        {
            attrs: {
                type: 'export'
            },
            callback: 'exportFile',
        },
    ],

    // 表格区
    table: [
        {
            prop: 'dataTypeName',
            label: '选项名称',
        },
        {
            prop: 'dataItemName',
            label: '选项内容',
        },
    ],

    // 分页区
    pagination: true,
}

module.exports = template`

fs.writeFile('template.js', data, err => {
    if (err) throw err
})