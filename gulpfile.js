import fs from "fs"
import gulp from "gulp"
import rename from "gulp-rename"
import header from "gulp-header"
import sourcemaps from "gulp-sourcemaps"
import dartSass from "sass"
import gulpSass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer"
import pug from "gulp-pug"

import through from "through-gulp"
import { each } from "./src/browser/js/_core/util/common.js"
import { mcbelist } from "./src/mcbelist.js"
import { LANGUAGES } from "./src/data.js"

const sass = gulpSass(dartSass)
const pkg = JSON.parse(fs.readFileSync("./package.json").toString())
const banner = `
/*!
 * ${pkg.name}.css v${pkg.version} (${pkg.homepage})
 * Copyright 2022-${new Date().getFullYear()} ${pkg.author}
 * Licensed under ${pkg.license}
 * 
 * This file is automatically generated, please do not change it.
 */
`.trim()

function mainCss() {
    return gulp.src("./src/browser/sass/index.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(header(banner))
        .pipe(autoprefixer())
        .pipe(rename("index.min.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./public/css"))
}

function virtualScrollCss() {
    return gulp.src("./src/browser/sass/virtualScroll.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(header(banner))
        .pipe(autoprefixer())
        .pipe(rename("virtualScroll.min.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./public/css"))
}

export const css = gulp.parallel(mainCss, virtualScrollCss)

function mainHtml() {
    return gulp.src("./views/index.pug")
        .pipe(rename("index.html"))
        .pipe(pug({
            locals: {
                bundle: true
            }
        }))
        .pipe(header("<!-- This file is automatically generated, please do not change it. -->"))
        .pipe(gulp.dest("./public"))
}

export const html = gulp.parallel(mainHtml)

async function mcbelistData() {
    return new Promise((resolve, reject) => {
        fs.rmSync("./public/api", {
            recursive: true,
            force: true
        })
        fs.mkdirSync("./public/api")
        each(LANGUAGES, (lang, _) => {
            each(_.branch, branch => {
                console.log('abcvdrfh')
                mcbelist(lang, branch).then(data => {
                    fs.writeFileSync(`./public/api/mcbelist.${lang}.${branch}.js`, "export default " + data)
                    resolve()
                }).catch(err => reject(err))
            })
        })
    })
}

export const data = gulp.parallel(mcbelistData)

export default gulp.series(css, html, data)
