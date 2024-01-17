<script lang='ts' setup>
import { SvgIcon } from '@/components/common'

interface AppInfo {
  demoData: string[]
  coverImg: string
  name: string
  des: string
}

interface Props {
  appInfo: AppInfo | null
}

interface Emit {
  (ev: 'prompt', item: string): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

function useDemo(prompt: string) {
  emit('prompt', prompt)
}
</script>

<template>
  <div v-if="appInfo" class="w-full mt-20 px-5">
    <div class="flex">
      <img class="w-16 h-16 mr-5" :src="appInfo.coverImg">
      <div class="flex flex-col">
        <div class="css-0 mb-2 line-clamp-1 break-all text-lg font-semibold tracking-wide text-[#333] dark:text-[#ffffff]">
          {{ appInfo?.name }}
        </div>
        <div class="flex">
          <p>{{ appInfo?.des }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-16">
      <span class="font-bold text-[#5a91fc] mb-3">示例模板</span>
      <div class="flex-1 pl-2 pr-5 py-1">
        <div v-for="(item, index) in appInfo.demoData" :key="index" class="border dark:border-[#ffffff17] px-3 py-1 rounded-md mb-2 flex justify-between items-center cursor-pointer transition hover:border-[#5a91fc] hover:text-[#5a91fc]" @click="useDemo(item)">
          <span class="circle mr-4" />
          <div class="flex-1  select-none text-left">
            {{ item }}
          </div>
          <SvgIcon class="w-6 text-xl" icon="material-symbols:tips-and-updates-outline" />
        </div>
      </div>
    </div>
  </div>
</template>
