<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import PostList from './components/PostList.vue'
  import ActionList from './components/ActionList.vue'
  import { usePostsStore } from './store'

  const store = usePostsStore()

  onBeforeMount(async () => {
    await store.getPosts()
  })
</script>

<template>
  <div class="tt-app-container">
    <PostList />
    <ActionList />
  </div>
</template>

<style scoped lang="scss">
  .tt-app-container {
    @apply flex justify-around gap-16 drop-shadow-md h-full;
  }
</style>
