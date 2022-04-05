import { each, replaceString } from "../_core/util/common.js"
import { snackbar, confirm } from "../src/mdui.js"
import { isAprilFools } from "../src/util.js"

const List = app.data._forCustom.List

export default {
    "zh-CN": {
        vanilla: {
            list: {
                __new: {
                    player: [
                        {
                            template: {
                                input: {
                                    text: "{name} "
                                }
                            },
                            __app_list__: true
                        },
                        {
                            name: "PFiS1737",
                            info: "作者名称 :-)"
                        }
                    ]
                },
                command: [
                    {
                        name: "@list",
                        info: "加载任意列表",
                        input: {
                            replace: "all",
                            text: "{name} "
                        }
                    },
                    {
                        name: "@option",
                        info: "切换页面设置",
                        input: {
                            replace: "all",
                            text: "{name} "
                        }
                    },
                    {
                        name: "@tools",
                        info: "打开对应工具",
                        input: {
                            replace: "all",
                            text: "{name} "
                        }
                    }
                ]
            },
            grammar: {
                __new: [
                    [
                        {
                            command: {
                                name: "/^@list$/",
                                info: "加载任意列表"
                            }
                        },
                        {
                            grammar: "<列表名> [列表内容]",
                            info: [
                                {
                                    length: 1,
                                    note: "指定要加载的列表的名称",
                                },
                                {
                                    length: 2,
                                    note(getter) {
                                        return `当前加载：${getter.catchInput(1)}`
                                    },
                                    list(getter) {
                                        return getter.catchInput(1)
                                    }
                                }
                            ]
                        }
                    ],
                    [
                        {
                            command: {
                                name: "/^@option$/",
                                info: "切换页面设置"
                            }
                        },
                        {
                            grammar: "<设置名> <值>",
                            info: [
                                {
                                    length: 1,
                                    note: "指定要切换设置的名称",
                                    list() {
                                        const keys = app.option.keys()
                                        const list = new List()
                                        list.setHeader({
                                            _indexName: "_option.keys",
                                            template: {
                                                input: {
                                                    text: "{name} "
                                                }
                                            }
                                        })
                                        each(keys, key => {
                                            if (key !== "customURL") list.setItem({
                                               name: key
                                            })
                                        })
                                        return list
                                    }
                                },
                                {
                                    length: 2,
                                    note: "指定要设置的值",
                                    list(getter) {
                                        const key = getter.catchInput(1)
                                        const values = app.option.valuesOf(key)
                                        const list = new List()
                                        list.setHeader({
                                            _indexName: "_option.values",
                                        })
                                        each(values, value => list.setItem({
                                            name: value === app.option._getItem(key).selected ? `${value} (Selected)` : value.toString(),
                                            onclick() {
                                                confirm({
                                                    message: replaceString("你确定要将 {key} 的值改为 {value} 吗？", { key, value }),
                                                    onConfirm: () => {
                                                        return app.option.setItem(key, value)
                                                    }
                                                }).then(([result, e]) => {
                                                    if (e) snackbar(e)  // Happy April Fools!
                                                    else if (result) snackbar("设置成功")
                                                }).catch(console.error)
                                                app.config.$input.value = `@option ${key} `
                                            }
                                        }))
                                        return list
                                    }
                                }
                            ]
                        }
                    ],
                    [
                        {
                            command: {
                                name: "/^@tools$/",
                                info: "打开对应工具"
                            }
                        },
                        {
                            grammar: "<工具名>",
                            info: [
                                {
                                    length: 1,
                                    note: "指定要打开的工具的名称",
                                    list() {
                                        const list = new List()
                                        list.setHeader({
                                            _indexName: "_tools",
                                            template: {
                                                input: {
                                                    text: "{name} "
                                                }
                                            }
                                        })
                                        each(document.querySelectorAll("[id$='dialog']"), tool => {
                                            list.setItem({
                                                name: tool.id.replace(/-dialog$/, ""),
                                                info: tool.querySelector(".mdui-dialog-title .mdui-typo-headline").innerHTML + ": " + tool.querySelector(".mdui-dialog-title .mdui-typo-caption-opacity").innerHTML
                                            })
                                        })
                                        return list
                                    }
                                }
                            ],
                            endFun(getter) {
                                try {
                                    _page.dialogs[getter.catchInput(1)].open()
                                    return {
                                        note: "打开成功"
                                    }
                                } catch {
                                    return {
                                        note: "打开失败"
                                    }
                                }
                            }
                        }
                    ]
                ]
            }
        }
    }
}
