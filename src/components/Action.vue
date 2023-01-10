<script setup lang="ts">
  import { defineProps } from 'vue'
  import { HistoryItem } from '../types'
  import {usePostsStore} from "../store";

  const store = usePostsStore()
  const { timeTravel } = store

  const props = defineProps<{
    historyItem: HistoryItem
    index: number
  }>()
</script>

<template>
  <div class="flex justify-between items-center p-4 shadow-md rounded-md mt-2">
    <div>{{ historyItem.changeMade }}</div>
    <button class="btn--time-travel" @click="timeTravel(index)">Time Travel</button>
  </div>
</template>

<style scoped lang="scss">
  .btn--time-travel {
    @apply ml-3 rounded-sm bg-green-400 hover:bg-green-500 pl-3 pr-3 pt-2 pb-2 active:bg-green-600;
  }
</style>
