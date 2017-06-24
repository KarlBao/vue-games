const replace = require('replace')
const path = require('path')
const fs = require('fs')
const ncp = require('ncp')

const projectName = process.argv[2]

const fromDir = path.resolve(__dirname, '../_tmpl')
const toDir = path.resolve(__dirname, '../src/' + projectName)

// 检查参数
if (!projectName) {
  console.error(`[Missing argument] : Please use 'npm run init -- [projectName]' to define the name of project.`)
  process.exit()
}

if (fs.existsSync(toDir)) {
  console.error(`[Existing directory] : Directory ${projectName} is already existed.`)
  process.exit()
}

// 初始化配置文件
function initConfig() {
  const options = {
    paths: [toDir + '/project.json'],
    regex: '#{name}',
    replacement: projectName,
    recursive: true,
    silent: true
  }

  replace(options)

  console.info(`Success! Please execute 'npm run dev' to start...`)
}

ncp(`${fromDir}`, toDir, err => {
  if (err) {
    console.error(err)
    process.exit()
  }
  initConfig()
})