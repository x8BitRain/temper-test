<script setup lang="ts">
  import Post from './Post.vue'
  import { usePostsStore } from '../store'
  import { storeToRefs } from 'pinia'
  const store = usePostsStore()
  const { posts } = storeToRefs(store)
</script>

<template>
  <div>
    <h1>Sortable Post List</h1>
    <div class="block max-w-md">
      <Post
        v-for="(post, index) in posts"
        :post="post"
        :index="index"
        :key="post.id"
      />
    </div>
  </div>
</template>

<style scoped></style>
