<template>
  <div v-if="!isLoading">
    <AppHead>
    </AppHead>

    <NuxtLayout>
    <NuxtPage />
    </NuxtLayout>


    <AppModal v-if="modal === true" @closeModal="closeModal">
    <template #modalBody="{ bodyInfo }">
      <component v-if="typeInfo" :is="typeGroupInfo[typeInfo]" :items="bodyInfo" @closeModal="closeModal"/>
    </template>
    </AppModal>

  </div>
</template>

<script setup>
import './scss/styles.scss'


import { computed, ref, onMounted, watch } from "vue";
import { useModalStore } from "./stores/modalStore";
import { useOrdersStore } from "./stores/ordersStore";
import { useLanglStore } from "./stores/langStore";

import OrderParams from "./components/slots/OrderParams.vue";
import ProducsDelete from "./components/slots/ProducsDelete.vue";
import AlertMessage from "./components/slots/AlertMessage.vue";


const storeLang = computed( () => useLanglStore() )  
const ordersStore = useOrdersStore();
const modalStore = computed(() => useModalStore());
const modal = computed(() => modalStore.value.isOpenModal);
const closeModal = () => {
  modalStore.value.closeModal();
};

const typeInfo = computed(() => modalStore.value.tapeModalInfo);

const typeGroupInfo = {
  OrderParams,
  ProducsDelete,
  AlertMessage
}

const orderDetails = ref([]);
const productsDetails = ref([]);

let countOrderDetails = 0;
let countProductsDetails = 0;

async function loadData(tableName, targetRef, count) {
  try {
    const res = await fetch(`http://localhost:4000/loading/${tableName}`);
    const json = await res.json();
    if (json.length) {
      targetRef.value = json; // Сохраните данные в соответствующую переменную
    }
  } catch (error) {
    console.log(`Error loading ${tableName} data:`, error);
    if (count <= 3) {
      setTimeout(() => {
        loadData(tableName, targetRef, count + 1);
      }, 5000);
    }
  }
}

const isLoading = ref(true)
onMounted(() => {
  isLoading.value = true
  loadData('orderDetails', orderDetails, countOrderDetails);
  loadData('productsDetails', productsDetails, countProductsDetails);


  let lang = localStorage.getItem("lang");
  if(lang) {
    isLoading.value =  storeLang.value.refrechLang({langFlag: lang })
  } else {
    isLoading.value = storeLang.value.refrechLang({langFlag:'en'})
  }

});

watch([orderDetails, productsDetails], val => {
  if(val[0].length && val[1].length) {
    ordersStore.addOrdersProdacsDate({ orders:val[0], products:val[1] })
  }
} )


</script>