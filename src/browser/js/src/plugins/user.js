import { WebOption } from "../../lib/WebOption.class.js"

export default async function(app) {
    const user = new WebOption("userData")
    
    app.event.on("app.input", () => {
        user.setItemVal("inputting", app.config.$input.value).done()
    }).on("app.input.copy", value => {
        user.setItemVal("history", value).done()
    }).on("app.input.love", value => {
        user.setItemVal("love", value).done()
    })
    
    return user
    
    .addItem({
        name: "inputting",
        defaultValue: "",
        callback(...args) {
            console.debug("userData: inputting -> from", args[1], "to", args[0])
        }
    })
    .addItem({
        name: "history",
        callback(...args) {
            console.debug("userData: history -> from", args[1], "to", args[0])
        },
        storageModel: true
    })
    .addItem({
        name: "love",
        callback(...args) {
            console.debug("userData: love -> from", args[1], "to", args[0])
        },
        storageModel: true
    })
}
