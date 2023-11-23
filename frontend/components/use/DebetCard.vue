<template>
  <div
    class="col-12 d-flex flex-wrap align-items-center justify-content-center mt-5"
  >
    <ul class="col-12 list-group d-grid">
      <li
        v-for="(item, idx) in items"
        :key="item.serialNumber + idx"
        class="col-12 list-group-item d-flex justify-content-between align-items-center mb-3 adaptiv"
        @click="openDetail(item)"
      >
        <div 
        class="d-flex flex-wrap align-items-center"
        :class="`col-${countCol}`"
        >

          <div class="d-flex align-items-center">
            
            <img :src="`./img/${item.photo}`" class="iconLot me-3" alt="" />

            <p class="fs-6 me-3">
              {{ item.title }}
            </p>
          </div>
          <div class="d-flex align-items-center">
            <p class="me-3">{{ $t(status[item.isNew]) }}</p>

            <p class="me-3">
              c {{ item.guarantee_start }}
              <br />
              по {{ item.guarantee_end }}
            </p>

            <p class="me-3">{{ $t(statusNew[item.isNew]) }}</p>

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
            <p class="me-3 col-5">
              {{ item.title }}
            </p>

            <p class="col me-3">
              {{ item.date }}
            </p>

            <button
            @click.stop="deleteProducs(item)"
            class="delete"
            >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
              />
            </svg>
            </button>

          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatCurrency } from "../../utils/currency-filter";
import { useModalStore } from "../../stores/modalStore";

defineEmits({});
defineProps({
  items: {
    requared: true,
    type: Array,
  },
});

const status = ["Free", "Repair"];
const statusNew = ["New", "SecondHand"];

const modalStore = useModalStore();
const screenWidth = window.screen.width

const countCol = ref(6)

if(screenWidth > 1600) {
  countCol.value = 6
} else {
  countCol.value = 12
}

const openDetail = (item) => {
  modalStore.openModal({
    ...item,
    typeInfo: "OrderParams",
  });
};

const deleteProducs = (item) => {
  modalStore.openModal({
    ...item,
    typeInfo: "ProducsDelete",
  });
}

</script>

<script>
export default {
  name: "DebetCard",
};
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


