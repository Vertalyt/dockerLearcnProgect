
<template>
        <div class="mx-10 col-10 row d-flex">
          <p class="col-3">{{ $t('Products') }} / {{ countProducs }}</p>
          <HeadSelect v-if="productType" :selectItems="productType" nameSelect="orders" @selectChange="selectChange"/>
          <HeadSelect v-if="specification.length > 0" :selectItems="specification" nameSelect="Specification" @selectChange="selectChange"/>

        </div>
</template>


<script setup>
import { computed } from 'vue'
import HeadSelect from './HeadSelect.vue'



const emits = defineEmits({
  filterCard: Object,
});

const props = defineProps({
  ordersDate:{
    requared: true,
    type: Array
  },
  specification:{
    requared: true,
    type: Array
  },
  countProducs:{
    requared: true,
    type: Number
  },

  
})


const productType = computed( () =>  props.ordersDate.map(item => {
  return {
    id: item.id,
    title: item.title
  }
}))   



const selectChange = ({ id, type }) => {
  emits('filterCard', { id, type })
}

</script>

<script>
export default {
  name: 'HeadDebetCard',
}
</script>

