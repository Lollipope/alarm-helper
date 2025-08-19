<template>
  <div class="menu-panel" ref="target">
    <div class="tip">
      {{ isEdit ? '点击编辑可拖动图标排序' : '拖动图标可调整顺序' }}
    </div>
    <div class="menu-list list-const">
      <div class="list-wrap" ref="lRef">
        <AlarmMenuItem
          class="list-item"
          :class="{
            movable: item.id !== 'all' && isDrag,
            draggable: item.id !== 'all',
            disabled: item.id === 'all',
            shake: !isEdit,
          }"
          v-for="item in itemListLeftEdit"
          :key="item.id"
          :data-id="item.id"
          :item="item"
          :idSelect="idSelect"
          @click="onSelect(item)"
        />
      </div>
    </div>
    <div class="menu-list list-other">
      <div class="list-wrap" ref="rRef">
        <AlarmMenuItem
          class="list-item"
          :class="{
            movable: isDrag,
            draggable: item.id !== 'all',
            shake: !isEdit,
          }"
          v-for="item in itemListRightEdit"
          :key="item.id"
          :data-id="item.id"
          :item="item"
          :idSelect="idSelect"
          @click="onSelect(item)"
        />
      </div>
    </div>
    <div class="oper-bar">
      <ExpandButton v-model:isOpen="isOpen" />
      <span
        :class="{
          btn: true,
          edit: isEdit,
          save: !isEdit,
        }"
        @click="onEdit"
        >{{ isEdit ? '编辑' : '保存' }}</span
      >
    </div>
  </div>
</template>
<script lang="ts">
import Sortable from 'sortablejs'
</script>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { type MenuItem, sortArrayByIds } from '@ah/utils'
import AlarmMenuItem from '@ah/comp/alarm-menu-item/AlarmMenuItem.vue'
import ExpandButton from './expand-btn.vue'

const emits = defineEmits([
  'update:is-open',
  'update:id-select',
  'update:c-list',
  'update:e-list',
  'onSort',
])
// 当前面板是否展开
const isOpen = defineModel('isOpen', { type: Boolean })
// 当前选中的大类id
const idSelect = defineModel<string>('idSelect', { type: String, default: 'all' })
// 常显列表
const itemListLeft = defineModel('cList', { type: Array<MenuItem> })
// 展开列表
const itemListRight = defineModel('eList', { type: Array<MenuItem> })

// 编辑状态下的常显列表
const itemListLeftEdit = ref<MenuItem[]>([])
// 编辑状态下的展开列表
const itemListRightEdit = ref<MenuItem[]>([])

watch(
  () => itemListLeft.value,
  (newVal) => {
    const editConst = (newVal || []).filter((it) => it.id !== 'all')
    itemListLeftEdit.value = JSON.parse(JSON.stringify(editConst))
  },
)
watch(
  () => itemListRight.value,
  (newVal) => {
    itemListRightEdit.value = JSON.parse(JSON.stringify(newVal || []))
  },
)

const target = shallowRef<HTMLElement>()
onClickOutside(target, onHide)

function onHide() {
  if (isOpen.value) {
    isOpen.value = false
  }
}
function onSelect(item: MenuItem) {
  idSelect.value = item.id as string
}

const isEdit = ref(true)
const leftSort = shallowRef<Sortable>()
const rightSort = shallowRef<Sortable>()
function onEdit() {
  isEdit.value = !isEdit.value
  leftSort.value?.option('disabled', isEdit.value)
  rightSort.value?.option('disabled', isEdit.value)
  // 保存
  const isSave = isEdit.value
  if (isSave) {
    const menuIds = [
      ...itemListLeftEdit.value.map((i) => ({ ...i, isShow: 1 })),
      ...itemListRightEdit.value.map((i) => ({ ...i, isShow: 0 })),
    ]
      .filter((it) => it.id !== 'all')
      .map((it, idx) => {
        return {
          alarmKindId: it.id,
          alarmKindName: it.name,
          sort: idx,
          isShow: it.isShow,
        }
      })
    emits('onSort', menuIds)
  }
}
const isDrag = computed(() => {
  return !isEdit.value
})
const lRef = ref<HTMLElement | null>(null)
const rRef = ref<HTMLElement | null>(null)

onMounted(() => {
  initSort()
})

function initSort() {
  if (!lRef.value || !rRef.value) return
  if (!leftSort || !rightSort) return

  leftSort.value = new Sortable(lRef.value, getSortableOptions(true))
  rightSort.value = new Sortable(rRef.value, getSortableOptions(false))
}
function getSortableOptions(isLeft: boolean) {
  return {
    disabled: isEdit.value,
    dataIdAttr: 'data-id',
    draggable: '.draggable',
    group: getGroupConfig(isLeft),
    animation: 150,
    onEnd: updateCEList,
  }
}

function getGroupConfig(isLeft: boolean) {
  return {
    name: 'shared',
    pull: () =>
      isLeft
        ? isDrag.value
        : !!(isDrag.value && leftSort.value && leftSort.value.toArray().length < 10),
    put: () =>
      isLeft
        ? !!(isDrag.value && leftSort.value && leftSort.value?.toArray().length < 10)
        : isDrag.value,
  }
}

// 更新列表数据
function updateCEList() {
  // 左边菜单id集合
  const newIds1 = ['all', ...(leftSort.value?.toArray() as string[])]
  // 右边菜单id集合
  const newIds2 = [...(rightSort.value?.toArray() as string[])]
  // 所有菜单项
  const newList = [...(itemListLeftEdit.value || []), ...(itemListRightEdit.value || [])]

  // 获取左边和右边的菜单项
  const leftList = newList.filter((it) => newIds1.includes(String(it.id)))
  const rightList = newList.filter((it) => newIds2.includes(String(it.id)))

  // 根据排序后的id,排序左边和右边的菜单项
  itemListLeftEdit.value = sortArrayByIds<MenuItem>(leftList, newIds1)
  itemListRightEdit.value = sortArrayByIds<MenuItem>(rightList, newIds2)
}
onBeforeUnmount(() => {
  leftSort.value?.destroy()
  rightSort.value?.destroy()
  leftSort.value = rightSort.value = undefined
})
</script>

<style scoped lang="scss">
@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
  75% {
    transform: rotate(-4deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.menu-panel {
  user-select: none;
  position: absolute;
  left: -3px;
  bottom: -19px;
  z-index: 11;
  width: 242px;
  height: 766px;
  background: rgba(72, 76, 85, 0.8);
  border-radius: 32px 32px 24px 24px;
  display: flex;
  .tip {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 32px;
    width: 100%;
    height: 50px;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #fcbe47;
    line-height: 22px;
    letter-spacing: 1px;
    text-align: center;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        rgba(106, 111, 120, 0) 0%,
        #cfd1d3 51%,
        rgba(53, 54, 58, 0) 100%
      );
      opacity: 0.82;
    }
  }
  .menu-list {
    width: 90px;
    position: relative;
    padding-top: 110px;
    .list-wrap {
      height: 676px;
      padding-left: 20px;
      padding-right: 17px;
      .list-item {
        width: 56px;
        height: 56px;
        display: block;
        margin-bottom: 6px;
        cursor: pointer;
        position: relative;
        &.movable {
          cursor: move;
        }
        &.disabled {
          cursor: not-allowed;
        }
        .image {
          width: 100%;
          height: 100%;
        }
        .point {
          width: 5px;
          height: 5px;
          background: #ff2e2e;
          border-radius: 50%;
          position: absolute;
          right: 10px;
          top: 10px;
        }
        &.shake {
          animation: shake 0.5s ease-in-out infinite;
        }
      }
    }
    &.list-const {
      border-radius: 24px;
      background: linear-gradient(
        180deg,
        rgba(126, 131, 142, 0) 10%,
        rgba(76, 80, 88, 0.6) 18%,
        rgba(76, 80, 88, 0.6) 78%,
        rgba(72, 76, 85, 0) 100%
      );
    }
    &.list-other {
      width: calc(100% - 66px);
      font-size: 0;
      .list-wrap {
        padding-left: 0;
        display: block;
        .list-item {
          margin-left: 11px;
          display: inline-block;
        }
      }
    }
  }

  .oper-bar {
    position: absolute;
    left: 35px;
    bottom: 10px;
    display: flex;
    width: 178px;
    align-items: center;
    .btn {
      cursor: pointer;
      width: 38px;
      height: 28px;
      border-radius: 14px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      font-size: 10px;
      text-align: center;
      line-height: 28px;
      color: #fff;
      margin-left: auto;
      &.edit {
        background: #85a7ff;
        &:hover {
          background: #2b68ff;
        }
      }
      &.save {
        background: #8792ad;
        &:hover {
          background: #2b68ff;
        }
      }
    }
  }
}
</style>
