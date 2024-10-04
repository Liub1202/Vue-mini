// dev.js 用于打包 packages 下的模块，打包成 js 文件
// node dev.js 【需要打包的文件名】-f【打包的格式】
// (文件名 -f 打包格式) === argv.slice(2)

import minimist from "minimist";
import {resolve, dirname} from 'path'
import { fileURLToPath } from "url";
import { createRequire } from "module";

// node中的命令行参数通过 process 来获取 process.argv
const args = minimist(process.argv.slice(2))  // { _: [ 'reactivity' ], f: 'esm' }

// 在 esm 下使用 commonjs
const __filename = fileURLToPath(import.meta.url) // 获取文件的绝对路径 --> file:  -> /usr
const __dirnaem = dirname(__filename) // 因为 esm 中没有__dirname所以需要自己转换一下
const require = createRequire(import.meta.url) // 导入 require 模块

const target = args._[0] || "reactivity" // 具体打包哪个项目
const format = args.f || 'iife' // 打包后的模块规范

// 入口文件 根据命令行提供的路径进行解析
const entry = resolve(__dirnaem, `../packages/${target}/src/index.ts`)
console.log(entry)