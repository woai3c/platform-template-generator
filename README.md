# 平台项目页面生成器
## 操作流程
1. 执行 `git clone https://github.com/woai3c/platform-template-generator.git` 命令，克隆项目。
1. 执行 `npm i`，安装依赖。
1. 执行 `npm link`，生成全局命令。
1. 切换到工作项目，在该项目下打开命令行，执行 `ct`，生成 `template.js` 默认模板文件。
1. 在此模板上进行修改，根据要生成的页面作相应的改动。
1. 执行 `cp` 命令，根据模板文件 `template.js` 生成页面 `index.vue` 文件（可在 `template.js` 文件设置 `name` 属性来配置文件名称）。

1~3 只需要执行一次，以后要生成模板和文件都只需要从第 4 步开始执行。
