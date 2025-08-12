window.globalConfig = {
  AlarmCenterWsUrl: `172.17.0.88:18089`, // 告警中心Socket地址
  AlarmRobotApiContext: '/api/',
  AlarmStreamPath: `https://128.23.14.241:13000/api/GetCameraPlayURL`, //流媒体服务接口
  AlarmStreamDomain: `private`, //外网（public）还是内网（private）
  AlarmStreamRate: `slaver`, //获取主码流（master）或者副码流（slaver）
}
