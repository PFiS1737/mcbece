const fs = require('fs')
const path = require('path')

copyDir("./node_modules/mdui", "./public/mdui", [ "es", "src" ])
copyDir("./node_modules/eruda", "./public/eruda")

function copyFile(from, to) {
    let fileName = from.split("/")[from.split("/").length - 1]
    let fromPath = path.resolve(from)
    let toPath = path.resolve(to)
    if (!fs.existsSync(to)) fs.mkdirSync(to)
    fs.copyFileSync(fromPath, toPath + "/" + fileName)
}
function copyDir(from, to, ignore = []) {
    let fromPath = path.resolve(from)
    let toPath = path.resolve(to)
    if (!fs.existsSync(to)) fs.mkdirSync(to)
    fs.readdir(fromPath, (err, paths) => {
        if (err) return console.error(err)
        paths.forEach(item => {
            if (ignore.includes(item)) return
            let newFromPath = fromPath + '/' + item
            let newToPath = path.resolve(toPath + '/' + item)
            fs.stat(newFromPath, (err, stat) => {
                if (err) return console.error(err)
                if (stat.isFile()) fs.copyFileSync(newFromPath, newToPath)
                else if (stat.isDirectory()) copyDir(newFromPath, newToPath)
            })
        })
    })
}