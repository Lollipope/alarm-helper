// 告警历史参数类型
export interface AlarmHistoryParams {
  alarmKindId?: string | number //大类id
  alarmId?: string | number //小类id
  alarmLevel?: string | number //告警级别 0-无级别 1-一级，2-二级，3-三级，4-四级
  handleStatus?: string | number //处理状态，0-未处理，1-正报，2-误报
  alarmMajor?: string | number //告警重要性 1-重要，2-一般
  startTime?: string //开始时间
  endTime?: string //结束时间
  keyWord?: string //关键词（操作内容或操作人）
  roleId?: string
  userId?: string
  size?: number //分页
  page?: number //当前页
}
//字典
export interface DictItem {
  kindName: string
  kindId: string
}
// 下拉框类型
export type DictOptions = Array<DictItem>

// 响应类
export interface ResponseResult<T> {
  code: number
  data: T
  msg?: string
}
// 告警列表类型
export interface AlarmMsg {
  msgId: string
  msg: string
  msgVoice: string
  createTime: string
  updateTime: string
  handleStatus: number
  handleDetail?: string
  handleTime?: string
  handler?: string
  sourceId: string
  alarmId: number
  businessId: string
  alarmMajor: number
  alarmLevel: number
  isUp: number
  infoShow?: string
  alarmTime: string
  readTime?: string
  alarmSource?: string
  remark?: string
  alarmKindId: string
  alarmKindName: string
  isRead?: boolean | number | string
  info: string
  infoObj: unknown
  alarmName: string
  useVoice?: string | number
  isSupportReport: number
  intervalType?: string
  managementSectionId?: string
  managementSectionName?: string
  readStatus?: string
  handleUrl?: string
  $type: string // 当前告警消息类型 前端自定义: DIVIDER分割线
  isNew: boolean // 当前告警消息是否是新消息  前端自定义
  alarmTitle: string //告警标题
  alarmDesc: string //描述
  iconUrl: string //图标地址
}

//列表类型
export interface PageList<T> {
  result: Array<T>
  pageSize: number
  pageNumber: number
  totalCount: number
  thisPageNumber: number
  lastPageNumber: number
  thisPageFirstElementNumber: number
  firstResult: number
  firstPage: boolean
  lastPage: boolean
  hasNextPage: boolean
  hasPreviousPage: boolean
  thisPageLastElementNumber: number
  nextPageNumber: number
  previousPageNumber: number
  linkPageNumbers: number[]
}
// 告警小类
export interface AlarmSmallType {
  address: string | null
  alarmFreq: number
  alarmId: number
  alarmKindId: number
  alarmKindName: string | null
  alarmLevel: string
  alarmMajor: number
  alarmMajorName: string | null
  alarmName: string
  attachId: string | null
  enable: number
  enableName: string | null
  isSendVideo: number
  isSendVoice: number
  isSupportReport: number
  msgName: string
  systemId: string | null
  textTemplate: string
  triggerConditions: string
  voiceTemplate: string
}
// 告警大类
export interface AlarmBigType {
  alarmKindId: number
  alarmKindName: string
  attachId: string | null
  sort: number
  isRead: number | null //是否已读 ,0未读,其余已读(后端定的)
  isShow: number // 是否常显
}
// 用户告警小类配置
export interface AlarmConfigMsgUser {
  id: number
  alarmId: number
  userId: string
  useVoice: number
  voiceType: number
  isReceive: number
  popLevel: string
  upLevel: string
  readLevel: string
  alarmName: string | null
  alarmKindName: string | null
  voiceTemplate: string | null
  alarmLevel: string | null
}
// 系统参数类型
export interface SysParam {
  defaultValue?: string | undefined
  paramCode: string
  paramFieldName: string
}

// 告警小类类型权限
export interface AlarmConfView {
  alarmId: number
  id: number
  viewTag: number
}

// 告警用户配置(单个)
export interface AlarmUserConf {
  handleUrl: string | null
  isSupportReport: number
  alarmConfigMsgUser: AlarmConfigMsgUser
  alarmConfigViewList: AlarmConfView[] // 用于表示可以包含任意类型的数组，具体根据需要修改
  paramList: SysParam[] // 用于表示可以包含任意类型的数组，具体根据需要修改
}

// 未读消息类型
export interface UnreadBean {
  isImportant: boolean
  num: number | null
}

// 排序大类请求参数
export type SortAlarmBigType = Omit<AlarmBigType, 'attachId' | 'isRead'>

// 向外抛出的浏览器异常类型
export interface AlarmApiError {
  status: number // 浏览器响应状态码
  data: ResponseResult<unknown>
}

// 区间数据类型
export interface SectionItem {
  id: string
  managementSectionName: string
}

// 流媒体参数
export interface StreamPlayApiParams {
  deviceId: string
  needCompress: number // 参数开关 0-关，1-开，必填
  pid?: string
  rate?: 'master' | 'slaver' //获取主码流（master）或者副码流（slaver）
  domain?: 'private' | 'pulbic'
}
export interface StreamStopApiParams {
  deviceId?: string
  videoUrl?: string
}

// 告警大类 消息列表请求参数
export interface ConfigMsgKindListApiParams {
  startTime: string
  endTime: string
  handleStatus: string
}


export interface sendParams {
  receiveName: string,
  receivePhone: string,
  content: string,
  linkInfo: string,
  linkSys: string
}

export interface HistoryPageParams {
  page: number,
  size: number,
  msgId: string
}