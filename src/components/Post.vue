<script setup lang="ts">
  import { defineProps, computed } from 'vue'
  import ChevronUp from '~icons/mdi/chevron-up'
  import ChevronDown from '~icons/mdi/chevron-down'
  import { usePostsStore } from '../store'
  import { MoveDirections, Post } from '../types'

  const store = usePostsStore()
  const { movePost } = store

  const props = defineProps<{
    post: Post
    index: number
  }>()

  const isTopPost = computed(() => {
    return props.index === 0
  })

  const isBottomPost = computed(() => {
    return props.index === store.posts.length - 1
  })
</script>

<template>
  <div class="flex justify-between p-6 shadow-md rounded-md mt-2">
    <div>{{ post.title }}</div>
    <div class="flex flex-col justify-center items-center ml-3">
      <ChevronUp
        v-show="!isTopPost"
        @click="movePost(MoveDirections.UP, index)"
      />
      <ChevronDown
        v-show="!isBottomPost"
        @click="movePost(MoveDirections.DOWN, index)"
      />
    </div>
  </div>
</template>

<style scoped>
  .icon {
    @apply h-7 w-7 rounded-sm cursor-pointer hover:bg-gray-200;
  }
</style>
