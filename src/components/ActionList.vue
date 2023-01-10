<script setup lang="ts">
  import Action from './Action.vue'
  import { usePostsStore } from '../store'
  const store = usePostsStore()
</script>

<template>
  <div>
    <h1>List of actions committed</h1>
    <div class="block max-w-md">
      <Action
        v-for="(historyItem, index) in store.history"
        :history-item="historyItem"
        :index="index"
        :key="index"
      />
    </div>
  </div>
</template>

<style scoped></style>
