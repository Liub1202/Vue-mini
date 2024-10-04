// dev.js 用于打包 packages 下的模块，打包成 js 文件
// node dev.js 【需要打包的文件名】-f【打包的格式】
// (文件名 -f 打包格式) === argv.slice(2)

import minimist from "minimist";
import {resolve, dirname} from 'path'
import { fileURLToPath } from "url";
import { createRequire } from "module";
import esbuild from 'esbuild'

// node中的命令行参数通过 process 来获取 process.argv
const args = minimist(process.argv.slice(2))  // { _: [ 'reactivity' ], f: 'esm' }

// 在 esm 下使用 commonjs
const __filename = fileURLToPath(import.meta.url) // 获取文件的绝对路径 --> file:  -> /usr
const __dirname = dirname(__filename) // 因为 esm 中没有__dirname所以需要自己转换一下
const require = createRequire(import.meta.url) // 导入 require 模块

const target = args._[0] || "reactivity" // 具体打包哪个项目
const format = args.f || 'iife' // 打包后的模块规范

// 入口文件 根据命令行提供的路径进行解析
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)
const pkg = require(`../packages/${target}/package.json`)

// 使用 esbuild 根据需要进行打包
esbuild.context({
    entryPoints: [entry], // 入口
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), // 出口
    bundle: true, // true 表示将所有依赖打包到一个文件中
    platform: "browser", // 生成的代码将运行在浏览器环境中
    sourcemap: true, // 开启 sourceMap 便于调试代码
    format, // cjs esm iife
    globalName: pkg.buildOptions?.name // 用于指定全局变量的名称
}).then((ctx) => {
    console.log("dev start",ctx)
    return ctx.watch() // 监听入口文件，持续打包
})