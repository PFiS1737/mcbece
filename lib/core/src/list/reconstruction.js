import { each, objectHas } from "@/util/index.js"
import { List } from "../../lib/ListData.class.js"
import { rename } from "./rename.js"

export const _reconstruction = app => function(listNameGroup) {
    if (typeof listNameGroup === "string") {
        const listNames = listNameGroup.split(/\s*;\s*/)
        return _reconstruction(app).call(this, listNames)
    } else if (Array.isArray(listNameGroup)) {
        const output = []
        each(listNameGroup, name => {
            if (typeof name === "string") {
                const [ _name, option = "" ] = name.split("<-")
                const renameResult = rename(app).call(this, _name)
                if (Array.isArray(renameResult)) {
                    each(renameResult, name => {
                        const result = testExtend(app).call(this, name)
                        if (result) output.push(...result)
                        output.push({
                            name: name + option,
                            list: app.data.get("list", name),
                            option
                        })
                    })
                } else if (typeof renameResult === "string") {
                    const result = testExtend(app).call(this, renameResult)
                    if (result) output.push(...result)
                    output.push({
                        name: renameResult + option,
                        list: app.data.get("list", renameResult),
                        option
                    })
                }
            } else if (name instanceof List) {
                // 这一块应该是永远调用不到的...
                const result = testExtend(app).call(this, name)
                if (result) output.push(...result)
                const _name = name._header._indexName || "__anonymous"
                output.push({
                    name: _name,
                    list: name,
                    option: ""
                })
            }
        })
        return output
    } else if (listNameGroup instanceof List) {
        const output = []
        const result = testExtend(app).call(this, listNameGroup)
        if (result) output.push(...result)
        const name = listNameGroup._indexName || "__anonymous"
        output.push({
            name,
            list: listNameGroup,
            option: ""
        })
        return output
    }
}

const testExtend = app => function(_list) {
    let header
    if (typeof _list === "string") {
        const list = app.data.get("list", _list)
        header = list?._header
    } else if (_list instanceof List) {
        header = _list?._header
    }
    if (header && header.extend) {
        return _reconstruction(app).call(this, header.extend)
        //@type header.extend string || string[]
    }
}