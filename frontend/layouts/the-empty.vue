
<template>


  <div class="default bg-secondary">
    <slot />
  </div>

</template>


<script>
export default {
  name: 'the-epmty',
}
</script>

<style scoped>
.default {
  width: 100vW;
  height: 90vH;
}
</style>