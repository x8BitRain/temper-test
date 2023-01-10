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
  <div class="flex justify-around">
    <PostList />
    <ActionList />
  </div>
</template>

<style scoped lang="scss"></style>
