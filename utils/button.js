const { generateAttrStr, generateEventsStr } = require('./index')

const rightBtn = {
    print: true,
    export: true,
    import: true,
}

const permissions = {
    add: 'add',
    print: 'print',
    auth: 'setpermision',
    'assign-group': 'setgroup',
    role: 'setrole',
    password: 'updatepwd',
    delete: 'delete',
    edit: 'update',
    export: 'export',
    import: 'import',
}

function generateElementButton(data) {
    let permissionStr = ''
    if (data.permission && permissions[data.permission]) {
        permissionStr = `v-if="global || permission.${data.permission}"`
    }

    return `\n<el-button ${permissionStr} ${generateAttrStr(data.attrs)} ${generateAttrStr(data.dattrs, false, true)} ${generateEventsStr(data.events)}>${data.text}</el-button>`
}

function generateVButton(data) {
    let permissionStr = ''
    const permission = permissions[data.attrs.type] || (data.permission && permissions[data.permission])
    if (permission) {
        permissionStr = `v-if="global || permission.${permission}"`
    }

    return `\n<VButton ${permissionStr} ${generateAttrStr(data.attrs)} ${generateAttrStr(data.dattrs, false, true)} ${generateEventsStr(data.events)} />`
}

function isRightBtn(btn) {
    return rightBtn[btn]
}

module.exports = {
    permissions,
    isRightBtn,
    generateElementButton,
    generateVButton,
}