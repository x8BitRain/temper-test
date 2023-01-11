<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import { usePostsStore } from './store'
  import {storeToRefs} from "pinia";
  import ActionList from './components/actions/ActionList.vue'
  import BackgroundSlice from './components/misc/BackgroundSlice.vue'
  import Error from "./components/Error.vue";
  import PostList from './components/posts/PostList.vue'

  const store = usePostsStore()
  const { error } = storeToRefs(store)

  onBeforeMount(async () => {
    if (import.meta.vitest) return // If testing don't get posts
    await store.getPosts()
  })
</script>

<template>
  <div v-if="!error" class="tt-app-container">
    <BackgroundSlice />
    <PostList />
    <ActionList />
  </div>
  <Error v-else :error="error"/>
</template>

<style scoped lang="scss">
  .tt-app-container {
    @apply flex justify-around max-w-5xl m-auto min-w-xsm gap-16 drop-shadow-md h-full max-md:block;
  }
</style>
