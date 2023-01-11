<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import PostList from './components/posts/PostList.vue'
  import ActionList from './components/actions/ActionList.vue'
  import { usePostsStore } from './store'
  import {storeToRefs} from "pinia";
  import Error from "./components/Error.vue";

  const store = usePostsStore()
  const { error } = storeToRefs(store)

  onBeforeMount(async () => {
    await store.getPosts()
  })
</script>

<template>
  <div v-if="!error" class="tt-app-container">
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
