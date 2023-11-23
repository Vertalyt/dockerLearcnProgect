
<template>
  <div >
    <HeadDebetCard 
    v-if="ordersDate"
    :countProducs="infoProducs.length"
    :ordersDate="ordersDate"
    :specification="specification"
    @filterCard="filterCard"
     />


    <DebetCard 
    v-if="filterProducts"
    :items="filterProducts"/>

    <p v-else class="d-flex justify-content-center m-3">{{ $t('NoOrders') }} </p>
  </div>

</template>


<script setup>
import { computed, ref, watch } from 'vue'

import HeadDebetCard from '../components/use/HeadDebetCard.vue';
import DebetCard from '../components/use/DebetCard.vue'

import { useOrdersStore } from '../stores/ordersStore'
import { seachSpecification } from '../utils/seachSpecification'

definePageMeta({
  middleware: ['auth'],
  auth : true
});

defineEmits({});
defineProps({})

const storeOrders = useOrdersStore()
const ordersDate = computed(() => storeOrders.isOrders);

const IdOrder = ref()
const infoProducs = ref([])
const filterProducts = ref()
const specification = ref([])


watch(IdOrder, val => {
infoProducs.value = ordersDate.value.find(item => item.id === val).products
filterProducts.value = infoProducs.value
specification.value = seachSpecification(infoProducs)
}  )

watch(ordersDate, val => {
const filterProducts = val.find(item => item.id === IdOrder.value)
if(filterProducts) {
    filterProducts.value = filterProducts.products
}
})


const filterCard  = ({ id, type }) => {
if(id === 'choose' && type === 'orders') {
filterProducts.value = null
} else if (id === 'choose' && type === 'Specification' ) {
specification.value = seachSpecification()
filterProducts.value = infoProducs.value
}
else {
if(type === 'orders') {
IdOrder.value = id
}
if(type === 'Specification') {
filterProducts.value = infoProducs.value.filter(item => item.specification === `${type} ${id}`)
}
}
}

</script>

<script>
export default {
name: 'DebetView',
}
</script>

