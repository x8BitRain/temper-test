<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import { usePostsStore } from './store'
  import {storeToRefs} from "pinia";
  import ActionList from './components/actions/ActionList.vue'
  import BackgroundSlice from './components/BackgroundSlice.vue'
  import Error from "./components/Error.vue";
  import PostList from './components/posts/PostList.vue'

  const store = usePostsStore()
  const { error } = storeToRefs(store)

  onBeforeMount(async () => {
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
    @apply flex justify-around gap-16 drop-shadow-md h-full;
  }
</style>
