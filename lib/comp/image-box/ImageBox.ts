import ImageBox from './ImageBox.vue'

export interface ImageBoxProps {
  li: string
  showText: boolean
}

export type ImageBoxEmits = {}

export type ImageBoxInstance = InstanceType<typeof ImageBox>
