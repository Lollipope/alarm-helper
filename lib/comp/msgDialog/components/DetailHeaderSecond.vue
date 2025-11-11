<template>
	<div class="section-header">{{ title }}</div>
</template>

<script setup lang="ts">
defineProps({
	title: String
})
</script>

<style scoped lang="scss">
.section-header {
	padding-left: 12px;
	height: 22px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	font-size: 16px;
	color: #333333;
	line-height: 22px;
	letter-spacing: 1px;
	text-align: left;
	font-style: normal;
	position: relative;
	&::before {
		position: absolute;
		left: 0;
		top: 6px;
		content: "";
		display: block;
		width: 3px;
		height: 8px;
		background: #2b68ff;
		border-radius: 2px;
	}
	
}
</style>
