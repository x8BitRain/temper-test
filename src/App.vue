<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import PostList from './components/PostList.vue'
  import ActionList from './components/ActionList.vue'

  onBeforeMount(() => {})
</script>

<template>
  <div class="flex justify-around">
    <PostList />
    <ActionList />
  </div>
</template>

<style scoped lang="scss"></style>
