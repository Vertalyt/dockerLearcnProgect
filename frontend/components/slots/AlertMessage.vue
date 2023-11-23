
<template>
  <div class="card d-flex justify-content-center align-items-center border border-danger">
   <p class="p-3 fw-semibold">{{ items.text }}</p>
  </div>
</template>


<script setup>
defineEmits({});
defineProps({
  items: {
    requared: true,
    type: Object
  }
})
</script>

<script>
export default {
  name: 'AlertMessage',
}
</script>

