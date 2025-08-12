<template>
  <Swiper
    class="mySwiper"
    :space-between="spaceBetween"
    :modules="modules"
    :slides-per-view="slidesPerView"
    :pagination="pagination"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <SwiperSlide v-for="(item, idx) of list" :key="idx" class="swiper-slide">
      <slot :data="{ item, idx }"></slot>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import type { SwiperBoxProps, SwiperBoxEmits } from './SwiperBox'

defineOptions({
  name: 'AlarmHelperSwiperBox',
})
const props = withDefaults(defineProps<SwiperBoxProps>(), {
  spaceBetween: 15,
  slidesPerView: 1,
})

// TODO: 此处有点问题
// Remove props with value null (e.g., width: null) to satisfy Swiper's type requirements
const filteredProps = computed(() => {
  const result: Record<string, unknown> = {}
  Object.entries(props).forEach(([key, value]) => {
    if (value !== null) {
      result[key] = value
    }
  })
  return result
})

const modules = [Pagination]
const pagination = ref()
watch(
  () => props.list,
  (val) => {
    pagination.value = val && val.length > 1 ? { clickable: true } : false
  },
  {
    immediate: true,
  },
)

const emits = defineEmits<SwiperBoxEmits>()
function onSwiper(swiper: any) {
  emits('swiper', swiper)
}
function onSlideChange(slides: any) {
  emits('slide-change', slides)
}
</script>

<style scoped lang="scss">
.mySwiper {
  width: 100%;
  height: 100%;
  .swiper-slide {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100% !important;
    height: 100%;
    column-gap: 10px;
    padding-bottom: 8px;
  }
}
</style>
