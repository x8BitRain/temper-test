<script setup lang="ts">
  import Action from './Action.vue'
  import { usePostsStore } from '../../store'
  import { storeToRefs } from 'pinia'
  import PlaceholderAction from './PlaceholderAction.vue'

  const store = usePostsStore()
  const { history } = storeToRefs(store)
</script>

<template>
  <div class="tt-action-list">
    <div class="tt-action-list__header-container">
      <h1 class="tt-action-list__header-text">List of actions committed</h1>
    </div>
    <div class="tt-action-list__item-container">
      <transition-group
        class="drop-shadow-md"
        name="action-list"
        tag="div"
        v-if="history.length"
      >
        <Action
          v-for="(historyItem, index) in history"
          :history-item="historyItem"
          :index="index"
          :key="index"
        />
      </transition-group>
      <PlaceholderAction v-else />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .tt-action-list {
    @apply block flex-1 rounded-md;
    &__header-container {
      @apply bg-white rounded-tr-md rounded-tl-md;
    }
    &__header-text {
      @apply font-semibold bg-white p-4 text-gray-600 text-xl rounded-tr-md rounded-tl-md;
    }
    &__item-container {
      @apply p-4 bg-gray-100 max-h-[90%] overflow-auto rounded-br-md rounded-bl-md;
    }
  }
</style>
