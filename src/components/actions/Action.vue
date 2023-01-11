<script setup lang="ts">
  import { defineProps } from 'vue'
  import { HistoryItem } from '../../types'
  import { usePostsStore } from '../../store'

  const store = usePostsStore()
  const { timeTravel } = store

  defineProps<{
    historyItem: HistoryItem
    index: number
  }>()
</script>

<template>
  <div class="tt-action-item">
    <div>{{ historyItem.description }}</div>
    <button class="tt-btn tt-btn--time-travel" @click="timeTravel(index)">Time Travel</button>
  </div>
</template>

<style scoped lang="scss">
  .tt-action-item {
    @apply flex
    justify-between
    bg-white
    items-center
    p-4
    first-of-type:rounded-tr-md
    border-b-2
    border-b-gray-100
    first-of-type:rounded-tl-md
    last-of-type:rounded-br-md
    last-of-type:border-b-0
    last-of-type:rounded-bl-md;
  }
</style>
