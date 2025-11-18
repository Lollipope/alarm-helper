<template>
    <el-dialog v-model="visible" append-to-body width="656px" :close-on-click-modal="true" :show-close="true">
        <template #header="{ }">
            <div class="snedMsg-header">
                <DetailHeader title="发送消息" />
            </div>
        </template>
        <div class="snedMsg-body">
            <div class="selList">
                <div @click="switchFn(0)" class="sel" :class="{ unSel: selected !== 0 }">
                    <img class="iconImg" :src="selected === 0 ? sendIconSel : sendIcon" alt="">
                    <div>发送消息</div>
                </div>
                <div @click="switchFn(1)" class="sel" :class="{ unSel: selected !== 1 }">
                    <img class="iconImg" :src="selected === 1 ? historyListSel : historyList" alt="">
                    <div>短信发送历史记录</div>
                </div>
            </div>

            <div class="content">
                <SendMsgPage @hide="visible = false" :alarmSelect="props.alarmSelect" v-if="selected === 0"></SendMsgPage>
                <MsgHistory :alarmSelect="props.alarmSelect" v-else></MsgHistory>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import DetailHeader from "./components/DetailHeader.vue"
import sendIcon from '../../assets/images/sendMsg/sendIcon.png'
import sendIconSel from '../../assets/images/sendMsg/sendIconSel.png'
import historyList from '../../assets/images/sendMsg/historyList.png'
import historyListSel from '../../assets/images/sendMsg/historyListSel.png'
import SendMsgPage from './components/SendMsg.vue'
import MsgHistory from './components/MsgHistory.vue'


const visible = defineModel("visible", {
    type: Boolean,
    default: false
})

const props = defineProps({
    alarmSelect: {
        type: Object,
        default: () => {}
    }
})

const selected = ref(0)

function switchFn(val: number) {
    selected.value = val
}
</script>

<style lang="scss" scoped>
.snedMsg-header {
    display: flex;
    align-items: center;
    height: 100%;
}

.snedMsg-body {

    .selList {
        display: flex;
        justify-content: start;
        align-items: center;
        margin-bottom: 5px;

        .sel {
            background-image: url('../../assets/images/sendMsg/msgbakSel.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 35%;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 16px;
            color: #FFFFFF;
            cursor: pointer;

            .iconImg {
                width: 16px;
                height: 15px;
                margin-right: 8px;
            }
        }

        .unSel {
            background-image: url('../../assets/images/sendMsg/msgbak.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 35%;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 16px;
            color: #333;
            cursor: pointer;

            .iconImg {
                width: 16px;
                height: 15px;
                margin-right: 8px;
            }
        }
    }

    .content {
        width: 100%;
        height: 430px;
        overflow-y: auto;
        background: #EFF4FF;
    }

}
</style>