import express from "express"
import logger from "morgan"
import docsRouter from "./router/docs.js"
import apiRouter from "./router/api.js"
import sass from "sass"

const app = express()

// Settings
app.set("view engine", "pug")
app.set("views", "./views")

// Middlewares
app.use(logger("dev"))
app.use(express.static("./public"))
app.use("/lib", express.static("./node_modules"))

// Routers
app.use("/docs", docsRouter)
app.use("/api", apiRouter)

// SASS -> CSS
app.get("/css/index.css", (req, res) => {
    sass.compileAsync("./src/scss/index.scss", {
        style: "compressed"
    }).then(({ css }) => {
        res.status(200).type(".css").send(css)
    }).catch(console.error)
})

// Main
app.get("/", (req, res) => {
    res.render("index.pug", {
        MOBILE_DEV_MODEL: process.argv.includes("--mobile-dev"),
    })
})

// 404 Not Found
app.use((req, res) => {
    res.status(404).send("Page not found!")
})

// Create server
app.listen(8080, () => {
    console.log("====================\nWeb server is running at 127.0.0.1:8080\n====================")
})
