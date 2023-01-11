<template>
 <div class="tt-error">
   <AlertCircleOutline />
   {{ error }}
 </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  import AlertCircleOutline from '~icons/mdi/alert-circle-outline'

  defineProps<{
    error: string
  }>()
</script>

<style scoped lang="scss">
 .tt-error {
   @apply flex justify-center items-center gap-2 font-semibold text-red-500 h-full
 }
</style>
