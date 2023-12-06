![image](https://raw.githubusercontent.com/Coooookies/vscode-league-respawn-timer/master/assets/banner.jpg)

一款在 [Visual Studio Code](https://code.visualstudio.com) 里显示 **`《英雄联盟》`** 玩家重生时间的插件。
[English](https://github.com/Coooookies/vscode-league-respawn-timer/blob/master/README.md) | 简体中文

[![Version](https://img.shields.io/visual-studio-marketplace/v/ButterCookies.league-respawn-timer?logo=visualstudiocode&style=flat-square)](https://marketplace.visualstudio.com/items?itemName=ButterCookies.league-respawn-timer) [![Installs](https://img.shields.io/visual-studio-marketplace/i/ButterCookies.league-respawn-timer?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=ButterCookies.league-respawn-timer) [![Ratings](https://img.shields.io/visual-studio-marketplace/r/ButterCookies.league-respawn-timer?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=ButterCookies.league-respawn-timer) [![Stars](https://img.shields.io/github/stars/Coooookies/vscode-league-respawn-timer?logo=github&style=flat-square)](https://github.com/Coooookies/vscode-league-respawn-timer) [![License](https://img.shields.io/github/license/Coooookies/vscode-league-respawn-timer?style=flat-square)](https://github.com/Coooookies/vscode-league-respawn-timer)

#### 为什么我会制作这款插件？

_我的大多数开发项目都与《英雄联盟》游戏相关。有时为了测试我的项目，我不得不用匹配/排位进行调试，当我角色死亡之后，我时常会切屏出来对我的代码进行改进，但我经常忘记了我的复活时间，导致频繁切屏，为了解决这个问题，我开发了这个插件。_

## 🕹️ 功能

- [x] **显示重生时间**

## 🔧 如何使用

1. **安装插件。**
2. **启动你的 `游戏客户端` 并且开始游戏。**
   当你进入游戏对局后，你的 `游戏名称` 将会被显示在 Vscode 的状态栏上。当你死时, 你的重生时间会显示在你`游戏名称`的位置。

## 🪣 命令

按下 `Ctrl+Shift+P` 打开快速命令面板, 输入 `League Respawn Timer` 并选择你想要运行的命令。

- `league-respawn-timer.enable-timer`: 启用本插件。
- `league-respawn-timer.disable-timer`: 禁用本插件。
- `league-respawn-timer.show-menu`: 显示菜单。

## 🛠️ 配置项

| 名称                                       |   类型    | 默认值 | 介绍         |
| :----------------------------------------- | :-------: | :----: | :----------- |
| `league-respawn-timer.enable`              | `Boolean` | `true` | 启用本插件。 |
| `league-respawn-timer.enable-notification` | `Boolean` | `true` | 启用插件通知 |

## 协议

本插件遵循 [MIT](LICENSE) 协议
