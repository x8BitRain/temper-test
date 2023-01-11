<template>
  <div class="tt-background-slice"></div>
</template>

<style scoped lang="scss">
  .tt-background-slice {
    @apply transform-gpu absolute bg-temper-purple w-screen h-screen shadow-md -z-10;
    transform: skewY(350deg) translateY(calc(-100% + 8em));
  }
</style>
