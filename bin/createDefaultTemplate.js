#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

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
            events: {
                callback: 'showModal(0)',
            }
            // permission: 'add', 如果不写权限，将按默认配置的权限设置，如果没有找到默认配置，则不添加权限。具体配置请看 utils/button.js
        },
        {
            type: 'el-button', // 默认为 VButton 组件，如需使用 el-button，需要显式设置
            attrs: {
                type: 'primary'
            },
            dattrs: {
                disabled: 'isDisabled',
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
            events: {
                callback: 'showModal(1)',
            }
        },
        {
            attrs: {
                type: 'export'
            },
            events: {
                callback: 'exportFile',
            }
        },
    ],

    // 表格区
    table: true,

    // 分页区
    pagination: true,

    // 弹窗区
    modal: [
        {
            dattrs: { // 动态属性，即 :attr="name" 这种模式，会自动生成对应的变量 name
                show: { // 显示声明对应的变量及默认值
                    key: 'isShowModal',
                    value: false,
                },
                title: 'title', // 默认为空字符串
            },
            events: {
                hideModal: 'hideModal(0)',
                submit: 'submit0',
            }
        },
        {
            attrs: { // 静态属性
                title: '静态标题',
            },
            events: {
                hideModal: 'hideModal(1)',
                submit: 'submit1',
            }
        }
    ]
}

module.exports = template`

fs.writeFile(`${path.resolve(process.cwd())}/template.js`, data, err => {
    if (err) throw err
})