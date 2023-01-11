<script setup lang="ts">
  import { defineProps, computed } from 'vue'
  import { usePostsStore } from '../store'
  import { MoveDirections, Post } from '../types'
  import ChevronUp from '~icons/mdi/chevron-up'
  import ChevronDown from '~icons/mdi/chevron-down'

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
  <div class="tt-post-item">
    <div>{{ post.title }}</div>
    <div class="tt-post-item__icon-container">
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

<style scoped lang="scss">
  .tt-post-item {
    @apply flex justify-between items-center p-4 min-h-post-card shadow-md rounded-md mb-5 bg-white;
    &__icon-container {
      @apply flex flex-col justify-center items-center ml-3;
    }
  }
  // .tt-icon class name is set by unplugin-icons config in vite.config.js
  .tt-icon {
    @apply h-7 w-7 rounded-sm cursor-pointer hover:bg-gray-200;
  }
</style>
