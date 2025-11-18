<template>
    <el-dialog v-model="visible" append-to-body width="596px" :show-close="true">
        <template #header="{ }">
            <div class="browse-header">
                <DetailHeader title="预览" />
            </div>
        </template>
        <DetailHeaderSecond title="短信内容"></DetailHeaderSecond>
        <div class="browse-body">
            <div class="text">
                {{ props.content }}
            </div>
            <div class="detailsTitle">
                <img :src="bellIcon" alt="">
                告警详情信息
            </div>
            <div class="detailsList">
                <div class="detailsList-item">
                    <div class="detailsList-item-label">告警类型：</div>
                    <div class="detailsList-item-cnt">{{ alarmSelect.alarmName }}</div>
                </div>
                <div class="detailsList-item">
                    <div class="detailsList-item-label">发生时间：</div>
                    <div class="detailsList-item-cnt">{{ alarmSelect.alarmTime }}</div>
                </div>
                <div class="detailsList-item">
                    <div class="detailsList-item-label">告警等级：</div>
                    <div class="detailsList-item-cnt">{{ alarmSelect.alarmLevel }}</div>
                </div>
                <div class="detailsList-item">
                    <div class="detailsList-item-label">报警位置：</div>
                    <div class="detailsList-item-cnt">{{ directionNameFilter(alarmSelect.info) }}</div>
                </div>
                <div class="detailsList-item">
                    <div class="detailsList-item-label">告警内容：</div>
                    <div class="detailsList-item-cnt" :title="alarmSelect.msg">
                        {{ alarmSelect.msg }}</div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import DetailHeader from './DetailHeader.vue'
import bellIcon from '../../../assets/images/sendMsg/bellIcon.png'
import DetailHeaderSecond from './DetailHeaderSecond.vue';

const visible = defineModel("visible", {
    type: Boolean,
    default: false
})

const props = defineProps({
    content:{
        type: String,
        default:''
    },
    alarmSelect: {
        type: Object,
        default: () => { }
    }
})

function directionNameFilter(val: string) {
    if (!val) return ''
    const data = JSON.parse(val)
    const directionName = data.directionName ? data.directionName : ''
    const roadName = data.roadName ? data.roadName : ''
    return roadName + directionName
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
    background: linear-gradient(180deg, #C9E4FF 0%, #FFFFFF 27%, #FFFFFF 100%);
    box-shadow: 0px 3px 18px 0px rgba(21, 50, 118, 0.39);
}


.browse-header {
    display: flex;
    align-items: center;
    height: 100%;
}

.browse-body {
    .text {
        padding: 10px 30px;
        max-height: 200px;
        overflow-y: auto;
    }

    .detailsTitle {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #2B68FF;
        display: flex;
        justify-content: start;
        align-items: center;
        width: 50%;
        height: 36px;
        background: linear-gradient(279deg, rgba(228, 236, 255, 0) 0%, #E4ECFF 100%);
        padding-left: 20px;

        img {
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
    }

    .detailsList {
        padding: 10px 30px;

        &-item {
            width: 100%;
            display: flex;
            justify-content: start;
            margin: 2px 0;

            &-label {
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                font-size: 14px;
                color: #666666;
                width: 15%;
            }

            &-cnt {
                font-family: PingFangSC, PingFang SC;
                font-weight: 500;
                font-size: 14px;
                color: #333333;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

        }
    }
}
</style>