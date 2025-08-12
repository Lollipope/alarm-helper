<template>
  <div class="search-box-wrapper">
    <div class="search-box" :class="{ active: isFocus }">
      <div
        class="search-icon"
        :class="{
          active: isChange,
        }"
        @click="onFilter"
      >
        筛选
      </div>
      <input
        type="text"
        placeholder="请输入关键字"
        class="ipt"
        v-model="condition.ipt"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @keyup.enter="onYes"
      />
      <div class="filter-btn" @click="onYes"></div>
    </div>
    <div class="filter-box" v-show="isOpen">
      <div class="filter-box-item">
        <span class="label">告警重要性:</span>
        <span class="cnt">
          <span
            :class="['cnt-item ', condition.importVal === item.value ? 'active' : '']"
            v-for="item in props.importOptions"
            :key="item.value"
            @click="condition.importVal = item.value"
            >{{ item.label }}
          </span>
        </span>
      </div>
      <div class="filter-box-item">
        <span class="label">告警级别:</span>
        <span class="cnt">
          <span
            :class="['cnt-item ', condition.gradeVal === item.value ? 'active' : '']"
            v-for="item in props.gradeOptions"
            :key="item.value"
            @click="condition.gradeVal = item.value"
            >{{ item.label }}
          </span>
        </span>
      </div>
      <div class="filter-box-item" v-if="typeOptions.length > 0">
        <span class="label">告警类型:</span>
        <span class="cnt">
          <span
            :class="['cnt-item ', condition.typeVal.includes(item.value) ? 'active' : '']"
            v-for="item in typeOptions"
            :key="item.value"
            @click="onChangeType(item)"
            >{{ item.label }}
          </span>
        </span>
      </div>
      <div class="filter-box-item">
        <span class="label">告警区间:</span>
        <span class="cnt">
          <span
            :class="['cnt-item ', condition.intervalType === item.value ? 'active' : '']"
            v-for="item in props.intervalTypeOptions"
            :key="item.value"
            @click="condition.intervalType = item.value"
            >{{ item.label }}
          </span>
        </span>
      </div>
      <div class="filter-box-item">
        <span class="label">消息状态:</span>
        <span class="cnt">
          <span
            :class="['cnt-item ', condition.isRead === item.value ? 'active' : '']"
            v-for="item in props.readOptions"
            :key="item.value"
            @click="condition.isRead = item.value"
            >{{ item.label }}
          </span>
        </span>
      </div>
      <div class="oper-btn">
        <span class="yes" @click.stop="onYes">确定</span>
        <span class="no" @click.stop="onReset">重置</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlarmTypeIds } from '../../../../utils'
import { AlarmRobotApi } from '../../../../api'
const emits = defineEmits(['onYes', 'onReset'])
interface SelectOption {
  label: string
  value: string
}
const props = defineProps({
  // 告警大类
  alarmType: {
    type: String,
    default: AlarmTypeIds.ALL,
  },
  // 告警重要性
  importOptions: {
    type: Array<SelectOption>,
    default: [],
  },
  // 级别
  gradeOptions: {
    type: Array<SelectOption>,
    default: [],
  },
  // 消息状态:已读 / 未读
  readOptions: {
    type: Array<SelectOption>,
    default: [],
  },
  // 告警区间
  intervalTypeOptions: {
    type: Array<SelectOption>,
    default: [],
  },
})
const condition = defineModel('condition', {
  type: Object,
  // default: {},
})

const isFocus = ref(false)
const isOpen = ref(false)

const typeOptions = ref<{ label: string; value: string }[]>([])
const isChange = computed(() => {
  return (
    condition.value.importVal !== '' ||
    condition.value.gradeVal !== '' ||
    condition.value.typeVal.length > 0 ||
    condition.value.isRead !== '' ||
    condition.value.intervalType !== ''
  )
})
// 监听告警大类变化
watch(() => props.alarmType, updateTypeOptions)

function updateTypeOptions(val: any) {
  if (val === AlarmTypeIds.ALL) {
    typeOptions.value = []
  } else {
    AlarmRobotApi.getAlarmConfigListByKindId(val).then((res) => {
      typeOptions.value = (res.data || []).map((item: any) => ({
        label: item.alarmName,
        value: item.alarmId,
      }))
    })
  }
}

function onFilter() {
  isOpen.value = !isOpen.value
}
function onChangeType(item: any) {
  let typeVal = condition.value.typeVal
  if (item.value === '') {
    const isAll = typeVal.includes(item.value)
    typeVal = isAll ? [] : typeOptions.value.map((v) => v.value)
  } else {
    if (typeVal.includes(item.value)) {
      typeVal = typeVal.filter((v: any) => v !== item.value)
    } else {
      typeVal.push(item.value)
    }
  }
  condition.value.typeVal = typeVal
}
function onYes() {
  isOpen.value = false
  emits('onYes')
}

function onReset() {
  condition.value = {
    importVal: '',
    gradeVal: '',
    typeVal: [],
    isRead: '',
  }
  isOpen.value = false
  emits('onReset')
}
</script>

<style scoped lang="scss">
.search-box-wrapper {
  margin-bottom: 12px;
  display: flex;
  position: relative;
  .search-box {
    width: 280px;
    height: 32px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    border: 1px solid #ffffff;
    display: flex;
    align-items: center;
    &.active {
      border-color: #2b68ff;
    }
    .ipt {
      border-radius: 12px;
      flex: 1;
      padding-left: 9px;
      width: 24px;
      border: none;
      box-shadow: none;
      outline: none;
      background: transparent;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #8697b4;
      }
    }
    .search-icon {
      cursor: pointer;
      font-weight: 500;
      line-height: 30px;
      height: 30px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #6e7f9b;
      padding-left: 30px;
      padding-right: 11px;
      position: relative;
      &:hover {
        background-color: #c6d7ff;
        border-radius: 15px 0 0 15px;
      }
      &.active {
        color: #2b68ff;
        font-weight: 600;
        &::before,
        &::after {
          color: #2b68ff;
        }
      }

      &::before {
        position: absolute;
        content: '+';
        display: block;
        color: #6e7f9b;
        left: 13px;
        height: 12px;
        width: 12px;
        top: -1px;
        z-index: 1;
        font-size: 16px;
      }
      &::after {
        content: '';
        position: absolute;
        display: block;
        z-index: 1;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 14px;
        background: #8697b4;
      }
    }

    .filter-btn {
      margin: 1px 0 1px 8px;
      width: 48px;
      height: 30px;
      background: #79a5ff;
      border-radius: 16px;
      cursor: pointer;
      position: relative;
      &:hover {
        background: #2b68ff;
      }
      &::before {
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 14px;
        height: 14px;
        margin: auto;
        position: absolute;
        content: '';
        background: url('../../../../assets/images/alarm-robot-pop-search.png') no-repeat 0 0 /100%
          100%;
      }
    }
  }

  .filter-box {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 40px;
    width: 280px;
    background: rgba(64, 64, 66, 0.8);
    box-shadow: 0px 3px 6px 0px rgba(10, 37, 130, 0.33);
    border-radius: 13px;
    border: 1px solid #f4f4f4;
    padding: 8px;

    .filter-box-item {
      margin-bottom: 5px;
      display: flex;
      .label {
        width: 53px;
        display: inline-block;
        flex-shrink: 0;
        height: 25px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 400;
        font-size: 10px;
        color: #ffffff;
        line-height: 25px;
        text-align: left;
        margin-right: 6px;
      }
      .cnt {
        overflow-y: auto;
        max-height: 200px;
        .cnt-item {
          cursor: pointer;
          user-select: none;
          display: inline-block;
          padding: 4px 10px;
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 500;
          font-size: 10px;
          color: #ffffff;
          line-height: 20px;
          border-radius: 10px;
          border: 1px solid #899ac5;
          margin-left: 6px;
          margin-bottom: 5px;
          &.active,
          &:hover {
            background: #2b68ff;
            color: #fff;
            border-color: #2b68ff;
          }
        }

        &:hover {
          &::-webkit-scrollbar-thumb {
            background-color: #dee5ec !important;
          }
        }
        &::-webkit-scrollbar-thumb {
          background-color: transparent !important;
        }
        &::-webkit-scrollbar,
        &::-webkit-scrollbar-track {
          width: 6px;
          height: 6px;
          border-radius: 4px;
          background-color: transparent !important; //设置背景透明
        }
      }
    }

    .oper-btn {
      cursor: pointer;
      user-select: none;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 500;
      font-size: 10px;
      line-height: 28px;
      margin-bottom: 5px;
      margin-right: 3px;
      text-align: right;
      .yes {
        display: inline-block;
        padding: 0 10px;
        margin-right: 8px;
        background: #2b68ff;
        color: #fff;
        border-radius: 14px;
      }
      .no {
        display: inline-block;
        padding: 0 10px;
        background: #8792ad;
        color: #fff;
        border-radius: 14px;
      }
    }
  }
}
</style>
