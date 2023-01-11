<script setup lang="ts">
  import Post from './Post.vue'
  import { usePostsStore } from '../../store'
  import { storeToRefs } from 'pinia'

  const store = usePostsStore()
  const { posts } = storeToRefs(store)
</script>

<template>
  <div class="tt-post-list">
    <h1 class="tt-post-list__header">Sortable Post List</h1>
    <div>
      <transition-group
        name="posts-list-order"
        tag="div"
        v-if="posts.length"
      >
        <Post
          v-for="(post, index) in posts"
          :post="post"
          :index="index"
          :key="post.id"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .tt-post-list {
    @apply block flex-1;
    &__header {
      @apply text-3xl font-semibold py-4 text-white;
    }
  }
</style>
