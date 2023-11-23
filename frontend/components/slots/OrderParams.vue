
<template>
          <div class="card">
            <img :src="`./img/${items.photo}`" class="card-img-top" :alt="items.title" />
            <div class="card-body">
              <p class="card-text">
                {{ $t('Type') }}: {{ items.type  }}
              </p>
              <p class="card-text">
                {{ $t('Guarantee') }}: {{ $t('from') }} {{ items.guarantee_start }} {{ $t('before') }} {{ items.guarantee_end }}
              </p>
              <p class="me-3"> {{ $t('Price') }}:  {{ formatCurrency(items.price[0].value, items.price[0].symbol) }} /  {{ formatCurrency(items.price[1].value, items.price[1].symbol) }}
                  </p>
            </div>
          </div>
</template>


<script setup>
import { formatCurrency } from '../../utils/currency-filter'

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
  name: 'OrderParams',
}
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}

.card > img {
  width: 100px;
  margin: 2rem;
}
</style>