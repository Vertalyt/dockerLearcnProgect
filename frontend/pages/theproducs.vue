
<template>
  <HeadSelect v-if="specification.length > 0" :selectItems="specification" nameSelect="Specification" @selectChange="selectChange"/>

<div
class="col-12 d-flex flex-wrap align-items-center justify-content-center mt-5"
>
<ul class="col-12 list-group d-grid"
v-if="producs"
>
<li
v-for="(item) in producs"
:key="item.serialNumber"
class="col-12 list-group-item d-flex justify-content-between align-items-center mb-3 adaptiv"
>
<div 
class="d-flex flex-wrap align-items-center"
:class="`col-${countCol}`"
>

  <div class="d-flex align-items-center">
    <img :src="`./img/${item.photo}`" class="iconLot me-3" alt="" />

    <p class="fs-6 me-3">
     ID: {{ item.products_id }}
    </p>
    <p class="fs-7 me-4">
      {{ item.title }}
    </p>
  </div>
  <div class="d-flex align-items-center">
    <p class="me-3">
      c {{ item.guarantee_start }}
      <br />
      по {{ item.guarantee_end }}
    </p>

    <p class="me-3">
      {{ formatCurrency(item.price[0].value, item.price[0].symbol) }}
      <br />
      {{ formatCurrency(item.price[1].value, item.price[1].symbol) }}
    </p>
  </div>
</div>

<div 
class="d-flex flex-wrap align-items-center"
:class="`col-${countCol}`"
>
  <div class="col-6 d-flex align-items-center">
    <p class="me-3">
      {{ item.type }}
      Lorem ipsum dolor sit amet.
    </p>
  </div>

  <div class="col-6 d-flex align-items-center">

    <p class="col me-3">
      {{ item.date }}
    </p>

  </div>
</div>


</li>


</ul>
</div>
</template>


<script setup>
import { ref, computed, watch } from 'vue'
import { useOrdersStore } from "../stores/ordersStore";
import { formatCurrency } from "../utils/currency-filter";
import { seachSpecification } from '../utils/seachSpecification'
import HeadSelect from '../components/use/HeadSelect.vue';

definePageMeta({
  middleware: ['auth'],
  auth : true
});

defineEmits({});
defineProps({})

const orderStore = useOrdersStore()

const screenWidth = window.screen.width

const countCol = ref(12)
if(screenWidth > 1600) {
countCol.value = 6
} else {
countCol.value = 12
}

const producsComputed = computed( () => orderStore.isProducs)
const producs = ref(producsComputed.value)
const specification = ref([])
watch(producs, _ => {
specification.value = seachSpecification(producsComputed)

}, { immediate: true }  )

const selectChange = ({ id, type }) => {
producs.value = producsComputed.value.filter(item => item.specification === `${type} ${id}`)
}

</script>

<script>
export default {
name: 'TheProducs',
}
</script>

<style scoped>
.iconLot {
width: 20px;
}

.delete {
border: none;
background-color: transparent;
}

@media (max-width: 1600px) {
.adaptiv {
flex-direction: column !important;
}
}



</style>