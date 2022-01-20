/**
 * TODO
 * {\s*(This:|Header:|Global:)?(.+)(\|(.+))?\s*}
 *     即 { <namespace>:<thing>[|<returnedThingIfNotFound>] }
 *     会被替换为该列表项中的对应内容**的字符串形式**
 *     若在该列表项中没有找到，则使用列表头中的对应内容
 *     若也没有，则会在 app.data.global 中查找并替换
 *     否则会输出为 "" (空字符串)
 *     namespace 为:
 *       - This 强制匹配该列表项中的内容
 *       - Header 强制匹配列表头中的内容
 *       - Global 强制匹配全局内容
 * ^{\$\s*(.+)\s*\$}$ 即 {$...$}
 *     执行 js 代码
 *     可以与 {...} 嵌套使用，会先将 {...} 替换为它的返回内容
 *     若只需成功，则会被替换为其返回值**的字符串形式**
 *     若执行失败，会以 console.warn 报错，并输出 "" (空字符串)
 *     若该段 js 代码没有输出，则输出为 "" (空字符串)
 */
