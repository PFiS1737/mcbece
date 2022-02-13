# 基岩版命令编写助手 | MCBE Command Editer

## 制作中...

> 重要通知：**咕咕咕**

#### 目前进度：以下为部分未完成任务

- 主要json：
    - 见 [mcbelist-api](https://github.com/PFiS1737/mcbelist-api)
- 主要js：
    - 框架化（基本完成）
        - 部分逻辑关系有待优化
    - 完善 `input` 模块
        - 有关「加载列表时的重命名」、「正在输入的变量的类型的判断」的函数，以及这些内容的联动
        - `input/type.js` 文件
        - `list/rename.js` 文件
        - `input/catch.js` 文件
        - `input/input.js` 文件
    - 更好的语法提示及自动补全模块
        - 支持已输入的内容替换语法提示的相关内容
        - 坐标及角度
        - 对目标选择器的自动补全仍有些问题
            - `x`, `y`, `z` 等涉及坐标的参数
            - `scores`, `hasitem` 等涉及 `{}` 块的参数
        - `execute` 命令还不能嵌套...（相当于不能用）
        - ...
    - 完善 `Virtual Scroll`
        - 滑到两头会卡住
        - 支持加载不同高度的列表项
        - 使用 `IntersectionObserver` 优化虚拟滚动
    - i18n
    - 事件化
    - 历史记录及收藏功能
    - 支持使用 `WebSocket` 连接至游戏并直接执行命令
        - 见 [mcbewscc](https://github.com/PFiS1737/mcbelist-api)
    - 优化设置模块，并添加新的设置项
        - 支持使用键值对预定设置内容
        - 将缩略版纳入设置
- 优化：
    - 自动滚动的语法提示栏
    - 桌面端tab键支持
    - 移动端布局优化
    - 长列表加载优化（暂时完成）
    - 穷举助手
    - JSON 编辑器
- 后期计划
    - 等有时间和设备的支持后，会视实际情况再决定要不要做
    - 使用 `webpack` 打包 `public/js/core` 及涉及的 `scss` 部分
