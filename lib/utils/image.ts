// import { isProd } from './env'
import { MenuItem } from './types'
// console.log('isProd: ', isProd, 'BASE_URL:', import.meta.env.BASE_URL)
// // 告警大类图片目录
// const AlarmTypePath = isProd ? '/alarm-helper/images/alarm-type/' : '../assets/images/alarm-type/'
// //告警小类类型图片
// const AlarmTypePathS = isProd ? '/alarm-helper/images/alarm-msg/' : '../assets/images/alarm-msg/'

/**
 * 获取报警类型图片地址
 * @param name 报警类型名称
 * @returns
 */
export function getAlarmTypeImgUrl(name: string) {
  return new URL(`../assets/images/alarm-type/alarm-type${name}.png`, import.meta.url).href
}
export function getAlarmSmallTypeImgUrl(name: string) {
  const alarmId = parseToNumber(name)
  const iconNum = alarmId ? (alarmId < 157 ? name : 'default') : 'default' // 157以上的没有图片数据,使用默认图片
  return new URL(`../assets/images/alarm-msg/icon${iconNum}.png`, import.meta.url).href
}
function parseToNumber(str: string) {
  // 尝试将字符串转换为数字
  const num = Number(str)
  // 如果转换后的值是 NaN，则表示字符串不是有效数字
  return isNaN(num) ? null : num
}

// 告警大类ID
export const AlarmTypeIds = {
  ALL: 'all',
  SDJC: 1, //"隧道监测",
  SFZJC: 2, //"收费站监测",
  FLJC: 3, //"防雷检测",
  JTQXJC: 4, //"交通气象监测",
  JSGJ: 5, //"积水告警",
  JTZTJC: 6, //"交通状态监测",
  SBKZ: 7, //"设备控制",
  SJTB: 8, //"事件填报",
  XTXX: 9, //"系统消息",
  SPXX: 10, //"审批消息",
  QBBAQFH: 11, //"情报板安全防护",
  ZDGKTJ: 12, //"主动管控推荐",
  ZNTJ: 13, //"智能推荐",
  XZQQ: 14, //"协作请求",
  ZDCLJC: 15, //"重点车辆监测",
  JTSJJC: 16, //"交通事件监测",
  JJJY: 17, //"接警救援",
  SBYC: 18, //"设备异常",
  DLJK: 19, //"电力监控",
  WRJGJ: 20, //"无人机告警",
  DHGJ: 21, //"动环告警",
  DLWD: 22, //"电缆温度告警",
  ZXCZ: 23, //"主线称重告警",
  JGWGJ: 24, //"结构物监测告警",
  KLJC: 25, //"客流监测",
  HJSSJC: 26, //"环境设施检测",
  HJJC: 27, //"环境监测",
}

export const AlarmTypeList: Array<MenuItem> = [
  {
    // 隧道检测
    id: AlarmTypeIds.ALL,
    name: '全部',
    imgUrl: getAlarmTypeImgUrl('00'),
    imgUrlS: getAlarmTypeImgUrl('00s'),
    // badge: true,
  },
  {
    id: AlarmTypeIds.SDJC,
    name: '隧道监测',
    imgUrl: getAlarmTypeImgUrl('01'),
    imgUrlS: getAlarmTypeImgUrl('01s'),
  },
  {
    id: AlarmTypeIds.SFZJC,
    name: '收费站监测',
    imgUrl: getAlarmTypeImgUrl('02'),
    imgUrlS: getAlarmTypeImgUrl('02s'),
  },
  {
    id: AlarmTypeIds.FLJC,
    name: '防雷检测',
    imgUrl: getAlarmTypeImgUrl('03'),
    imgUrlS: getAlarmTypeImgUrl('03s'),
  },
  {
    id: AlarmTypeIds.JTQXJC,
    name: '交通气象监测',
    imgUrl: getAlarmTypeImgUrl('04'),
    imgUrlS: getAlarmTypeImgUrl('04s'),
  },
  {
    id: AlarmTypeIds.JSGJ,
    name: '积水告警',
    imgUrl: getAlarmTypeImgUrl('05'),
    imgUrlS: getAlarmTypeImgUrl('05s'),
  },
  {
    id: AlarmTypeIds.JTZTJC,
    name: '交通状态',
    imgUrl: getAlarmTypeImgUrl('06'),
    imgUrlS: getAlarmTypeImgUrl('06s'),
  },
  {
    id: AlarmTypeIds.SBKZ,
    name: '设备控制',
    imgUrl: getAlarmTypeImgUrl('07'),
    imgUrlS: getAlarmTypeImgUrl('07s'),
  },
  {
    id: AlarmTypeIds.SJTB,
    name: '事件填报',
    imgUrl: getAlarmTypeImgUrl('08'),
    imgUrlS: getAlarmTypeImgUrl('08s'),
  },
  {
    id: AlarmTypeIds.XTXX,
    name: '系统消息',
    imgUrl: getAlarmTypeImgUrl('09'),
    imgUrlS: getAlarmTypeImgUrl('09s'),
  },
  {
    id: AlarmTypeIds.SPXX,
    name: '审批消息',
    imgUrl: getAlarmTypeImgUrl('10'),
    imgUrlS: getAlarmTypeImgUrl('10s'),
  },
  {
    id: AlarmTypeIds.QBBAQFH,
    name: '情报板安全防护',
    imgUrl: getAlarmTypeImgUrl('11'),
    imgUrlS: getAlarmTypeImgUrl('11s'),
  },
  {
    id: AlarmTypeIds.ZDGKTJ,
    name: '主动管控',
    imgUrl: getAlarmTypeImgUrl('12'),
    imgUrlS: getAlarmTypeImgUrl('12s'),
  },
  {
    id: AlarmTypeIds.ZNTJ,
    name: '智能推荐',
    imgUrl: getAlarmTypeImgUrl('13'),
    imgUrlS: getAlarmTypeImgUrl('13s'),
  },
  {
    id: AlarmTypeIds.XZQQ,
    name: '协作请求',
    imgUrl: getAlarmTypeImgUrl('14'),
    imgUrlS: getAlarmTypeImgUrl('14s'),
  },
  {
    id: AlarmTypeIds.ZDCLJC,
    name: '重点车辆',
    imgUrl: getAlarmTypeImgUrl('15'),
    imgUrlS: getAlarmTypeImgUrl('15s'),
  },
  {
    id: AlarmTypeIds.JTSJJC,
    name: '交通事件',
    imgUrl: getAlarmTypeImgUrl('16'),
    imgUrlS: getAlarmTypeImgUrl('16s'),
  },
  {
    id: AlarmTypeIds.JJJY,
    name: '接警救援',
    imgUrl: getAlarmTypeImgUrl('17'),
    imgUrlS: getAlarmTypeImgUrl('17s'),
  },
  {
    id: AlarmTypeIds.SBYC,
    name: '设备异常',
    imgUrl: getAlarmTypeImgUrl('18'),
    imgUrlS: getAlarmTypeImgUrl('18s'),
  },
  {
    id: AlarmTypeIds.DLJK,
    name: '电力监控',
    imgUrl: getAlarmTypeImgUrl('19'),
    imgUrlS: getAlarmTypeImgUrl('19s'),
  },
  {
    id: AlarmTypeIds.WRJGJ,
    name: '无人机告警',
    imgUrl: getAlarmTypeImgUrl('20'),
    imgUrlS: getAlarmTypeImgUrl('20s'),
  },
  {
    id: AlarmTypeIds.DHGJ,
    name: '动环告警',
    imgUrl: getAlarmTypeImgUrl('21'),
    imgUrlS: getAlarmTypeImgUrl('21s'),
  },
  {
    id: AlarmTypeIds.DLWD,
    name: '电缆温度告警',
    imgUrl: getAlarmTypeImgUrl('22'),
    imgUrlS: getAlarmTypeImgUrl('22s'),
  },
  {
    id: AlarmTypeIds.ZXCZ,
    name: '主线称重告警',
    imgUrl: getAlarmTypeImgUrl('23'),
    imgUrlS: getAlarmTypeImgUrl('23s'),
  },
  {
    id: AlarmTypeIds.JGWGJ,
    name: '结构物监测告警',
    imgUrl: getAlarmTypeImgUrl('24'),
    imgUrlS: getAlarmTypeImgUrl('24s'),
  },
  {
    id: AlarmTypeIds.KLJC,
    name: '客流监测',
    imgUrl: getAlarmTypeImgUrl('25'),
    imgUrlS: getAlarmTypeImgUrl('25s'),
  },

  {
    id: AlarmTypeIds.HJSSJC,
    name: '环境设施检测',
    imgUrl: getAlarmTypeImgUrl('26'),
    imgUrlS: getAlarmTypeImgUrl('26s'),
  },
  {
    id: AlarmTypeIds.HJJC,
    name: '环境监测',
    imgUrl: getAlarmTypeImgUrl('27'),
    imgUrlS: getAlarmTypeImgUrl('27s'),
  },
]
export const imgUrlDefault = getAlarmTypeImgUrl('default')
export const imgUrlDefaultS = getAlarmTypeImgUrl('defaults')
