const template = {
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
            perssion: 'add'
        }
    ],

    // 表格区
    table: {

    },

    // 分页区
    page: {

    }
}

module.exports = template