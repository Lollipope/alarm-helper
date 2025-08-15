<p align="center"><img src='./logo.png' style='width:300px;height:100px;margin:0 auto;display:block'></img></p>
<p align="center">
  <a href="https://github.com/Lollipope/alarm-helper">
    <img src="https://img.shields.io/badge/vue-3.x-green?color=47c219" />
  </a>
  <a href="https://github.com/Lollipope/alarm-helper">
    <img src="https://img.shields.io/npm/l/%40lollipope%2Falarm-helper?color=47c219" />
  </a>
  <a href="https://github.com/Lollipope/alarm-helper">
    <img src="https://img.shields.io/badge/node-%3E%3D18.16-47c219" />
  </a>
  <a href="https://codecov.io/gh/Lollipope/alarm-helper">
    <img src="https://img.shields.io/codecov/c/github/lollipope/alarm-helper/main?logo=codecov&color=47c219"/>
  </a>
  <br>
</p>

<h2 style="text-align: center;font-weight:bold">智慧版告警中心小助手</h1>

### 写在前面的话

:warning: **`此库只适用于Vue3项目集成`**:exclamation::exclamation::exclamation:

> 如果是Vue2项目(cdp版) ,请使用 [**@lollipope/alarm-helper-compat**](https://www.npmjs.com/package/@lollipope/alarm-helper-compat)

> 如果是vue2项目(msdp版),请使用 [**@lollipope/alarm-robot**](https://www.npmjs.com/package/alarm-robot)

### 集成文档

##### 1.安装依赖(建议使用 pnpm 下载)

```bash
# 安装 pnpm
npm install pnpm -g

# 安装依赖
pnpm i @lollipope/alarm-helper

#另 pnpm v10+版本需要执行以下命令
pnpm approve-builds
```

#### 2.添加配置文件

```js
//public/config/config.js:

//全局配置项
;(function (window) {
  window.globalConfig = {
    // 添加以下配置
    AlarmCenterWsUrl: `128.23.13.125:28082`, // 告警中心Socket地址
    AlarmRobotApiContext: '/api/', //告警弹窗接口前缀
    AlarmWebPath: '告警中心前端首页', //暂时不用配置
    AlarmStreamPath: `http://xxxx/api/GetCameraPlayURL`, //流媒体服务接口
    AlarmStreamDomain: `private`, //外网（public）还是内网（private）
    AlarmStreamRate: `slaver`, //获取主码流（master）或者副码流（slaver）
    AlarmStreamMode: '1', //  1:视频一体机 0:流媒体
  }
})(window)
```

配置说明:
| 参数 | 说明 | 类型 | <div style='width:100px'>是否必要</div> | <div style='width:80px'>默认值</div> |
| :----|:----| :----: |:----: |:----: |
| AlarmCenterWsUrl | 告警中心Socket地址<br> eg:`127.0.0.1:9527` | String | 是 | - |
| AlarmRobotApiContext | 告警弹窗接口前缀,需要拦截该前缀转发到对应后端地址 <br> eg:`/api/`| String | 是 | - |
| AlarmWebPath | 告警中心首页地址(外部系统集成需要配置,配置该项会新开页签并跳转) <br> eg:`http://localhost:9527/`| String | 否 | - |
| AlarmStreamPath | 流媒体服务接口Uri <br> eg:`http://ip:port/api/GetCameraPlayURL`| String | 是 | - |
| AlarmStreamDomain | 流媒体取流来源 | String | 否 | private |
| AlarmStreamRate | 流媒体码流 | String | 否 | slaver |
| AlarmStreamMode`(v0.2.13+)` | 流媒体码流取流方式, `1:视频一体机 0:流媒体` | String | 否 | - |

#### 3.组件引入:

- 根目录index.html中引入以下资源

```html
<!-- 引入播放依赖项  -->
<link rel="stylesheet" href="/alarm-helper/player/aliplayer-min.css" />
<script type="text/javascript" charset="utf-8" src="/alarm-helper/player/aliplayer-min.js" />
```

- 使用组件的地方

```html
<script setup lang="ts">
  // 引入组件
  import '@lollipope/alarm-helper/dist/index.css'
  import AlarmHelper from '@lollipope/alarm-helper'

  const userInfo = ref({ userId: '用户id' })
  const tokenId = ref('登录的token') //v0.2.17+ 新增
</script>

<template>
  <div class="cdp-base-container">
    <!-- 使用组件 -->
    <AlarmHelper :user-info="userInfo" :token-id="tokenId" />
  </div>
</template>
```

- 组件属性说明:

| 属性名   | 说明         |          类型          | <div style='width:100px'>是否必要</div> | <div style='width:80px'>默认值</div> | <div style='width:80px'>备注</div> |
| :------- | :----------- | :--------------------: | :-------------------------------------: | :----------------------------------: | :--------------------------------: |
| userInfo | 用户信息对象 | Object&{userId:String} |                   是                    |                  -                   |                 -                  |
| tokenId  | 登录的token  |         String         |                   是                    |                  -                   |          `v0.2.17+ 新增`           |

- 组件事件说明:

| 事件名     | 说明         |   回调参数    |      备注       |
| :--------- | :----------- | :-----------: | :-------------: |
| onApiError | 接口异常触发 | AlarmApiError | `v0.2.12+ 新增` |
