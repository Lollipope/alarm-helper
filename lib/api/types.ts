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
// 告警用户配置(单个)
export interface AlarmUserConf {
  handleUrl: string | null
  isSupportReport: number
  alarmConfigMsgUser: AlarmConfigMsgUser
  alarmConfigViewList: any[] // 用于表示可以包含任意类型的数组，具体根据需要修改
  paramList: any[] // 用于表示可以包含任意类型的数组，具体根据需要修改
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
