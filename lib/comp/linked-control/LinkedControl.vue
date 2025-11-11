<template>
    <el-dialog v-model="visible" append-to-body width="982px" :close-on-click-modal="true" :show-close="true">
        <template #header>
            <div class="linkedControlCon-header">
                <DetailHeader title="管控设备"></DetailHeader>
            </div>
        </template>

        <div class="linkedControlCon-body" v-if="url">
            <iframe style="width: 100%;height: 100%;" :src="url" frameborder="0"></iframe>
        </div>

    </el-dialog>
</template>

<script lang="ts" setup>
import DetailHeader from "../msg-dialog/components/DetailHeader.vue"

const url = ref()
const configUrl = window?.globalConfig?.LinkedControlUrl

const visible = defineModel("visible", {
    type: Boolean,
    default: false
})

const props = defineProps({
    alarmSelect: {
        type: Object,
        default: () => { }
    }
})

watch(() => props.alarmSelect, (n) => {
    if(!n) return
    if(!configUrl) return
    const info = JSON.parse(n.info)
    url.value = `${configUrl}?type=${n.alarmId}&roadNo=${info.roadNo}&directionNo=${info.directionNo}&milePost=${encodeURIComponent(info.milePost)}&source=4&sourceId=${n.msgId}&edit=1`
    // url.value = `${configUrl}?type=31&roadNo=273&directionNo=176&milePost=K100%2B100&source=5&sourceId=NS12323123&edit=1`
    console.log('url.value',url.value)

}, { immediate: true })
</script>

<style lang="scss" scoped>
.linkedControlCon-header {
    display: flex;
    align-items: center;
    height: 100%;
}

.linkedControlCon-body {
    height: 70vh;
}
</style>